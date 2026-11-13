"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";

type Music = {
  playing: boolean;
  muted: boolean;
  /** Must be called from a tap/click, since browsers block audio until a user gesture. */
  playFromStart: () => void;
  stop: () => void;
  toggleMute: () => void;
};

const MusicContext = createContext<Music | null>(null);

const FADE_IN_MS = 1500;
const FADE_OUT_MS = 900;
/** The home track is started by the intro's "Tap to begin", never automatically. */
const HOME_PATH = "/";

type FadeTimer = RefObject<ReturnType<typeof setInterval> | null>;

function fade(audio: HTMLAudioElement, timer: FadeTimer, target: number, ms: number, onDone?: () => void) {
  if (timer.current) clearInterval(timer.current);
  const from = audio.volume;
  const startedAt = Date.now();
  timer.current = setInterval(() => {
    const progress = Math.min(1, (Date.now() - startedAt) / ms);
    audio.volume = from + (target - from) * progress;
    if (progress >= 1) {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
      onDone?.();
    }
  }, 50);
}

function fadeOutAndPause(audio: HTMLAudioElement, timer: FadeTimer, onDone?: () => void) {
  if (audio.paused) {
    onDone?.();
    return;
  }
  fade(audio, timer, 0, FADE_OUT_MS, () => {
    audio.pause();
    onDone?.();
  });
}

const isTrack = (audio: HTMLAudioElement, src: string) =>
  audio.src === new URL(src, window.location.href).href;

/** Rejects if the browser blocks playback because there has been no user gesture yet. */
function startTrack(audio: HTMLAudioElement, timer: FadeTimer, src: string) {
  if (timer.current) clearInterval(timer.current);
  timer.current = null;
  if (!isTrack(audio, src)) audio.src = src;
  audio.currentTime = 0;
  audio.volume = 0;
  return audio.play().then(() => fade(audio, timer, 1, FADE_IN_MS));
}

export function MusicProvider({
  src,
  roomTracks,
  children,
}: {
  src: string;
  roomTracks: Record<string, string>;
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pathname = usePathname();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const roomSrc = roomTracks[pathname];
    if (!roomSrc) {
      if (pathname !== HOME_PATH || !isTrack(audio, src)) fadeOutAndPause(audio, fadeTimer);
      return;
    }

    let cancelled = false;
    let removeUnlock = () => {};
    const begin = () => {
      if (cancelled) return;
      startTrack(audio, fadeTimer, roomSrc).catch(() => {
        if (cancelled) return;
        const unlock = () => {
          removeUnlock();
          if (!cancelled) startTrack(audio, fadeTimer, roomSrc).catch(() => {});
        };
        window.addEventListener("pointerdown", unlock);
        window.addEventListener("keydown", unlock);
        removeUnlock = () => {
          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("keydown", unlock);
        };
      });
    };
    fadeOutAndPause(audio, fadeTimer, begin);

    return () => {
      cancelled = true;
      removeUnlock();
    };
  }, [pathname, roomTracks, src]);

  function playFromStart() {
    const audio = audioRef.current;
    if (audio) startTrack(audio, fadeTimer, src).catch(() => {});
  }

  function stop() {
    const audio = audioRef.current;
    if (audio) fadeOutAndPause(audio, fadeTimer);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  return (
    <MusicContext.Provider value={{ playing, muted, playFromStart, stop, toggleMute }}>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const music = useContext(MusicContext);
  if (!music) throw new Error("useMusic must be used inside MusicProvider");
  return music;
}

export function MuteButton() {
  const { playing, muted, toggleMute } = useMusic();
  if (!playing) return null;

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="btn-glass fixed right-5 top-5 z-50 flex size-11 items-center justify-center"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
        {muted ? (
          <>
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </>
        ) : (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        )}
      </svg>
    </button>
  );
}
