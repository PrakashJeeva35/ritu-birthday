"use client";

import { useEffect, useState, type ComponentType } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import type { Film as FilmData, FilmShot } from "@/content/film";

const TITLE_MS = 3600;
const SHOT_MS = 6000;
const LAST_SHOT_MS = 9000;
const FADE_S = 1.2;
const IMAGE_SIZES = "(min-width: 960px) 896px, 100vw";
const WORD_S = 0.28;

/** Ken Burns camera move for a shot: zoom from/to around a focal point, with an optional pan (in %). */
export type Camera = { origin: string; from: number; to: number; pan?: [number, number]; shake?: boolean };

type Props = {
  film: FilmData;
  camera: Record<string, Camera>;
  Effects: ComponentType<{ id: string }>;
};

export function Film({ film, camera, Effects }: Props) {
  const { shots } = film;
  const last = shots.length - 1;
  const durationOf = (index: number) => (index < 0 ? TITLE_MS : index === last ? LAST_SHOT_MS : SHOT_MS);

  const [run, setRun] = useState(0);
  const [index, setIndex] = useState(-1);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    const duration = index < 0 ? TITLE_MS : index === last ? LAST_SHOT_MS : SHOT_MS;
    const id = setTimeout(() => {
      if (index < last) setIndex(index + 1);
      else setFinished(true);
    }, duration);
    return () => clearTimeout(id);
  }, [index, finished, run, last]);

  useEffect(() => {
    if (index !== last) return;
    const id = setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 100,
        startVelocity: 32,
        origin: { y: 0.45 },
        colors: ["#ffd36e", "#c084fc", "#a78bfa", "#7dd3fc", "#fff7d6"],
        shapes: ["star", "circle"],
        zIndex: 35,
        disableForReducedMotion: true,
      });
    }, 1500);
    return () => clearTimeout(id);
  }, [index, run, last]);

  const replay = () => {
    setIndex(-1);
    setFinished(false);
    setRun((r) => r + 1);
  };

  const current = index >= 0 ? shots[index] : null;

  return (
    <div className="flex w-full max-w-4xl flex-col items-center">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/20 bg-black shadow-[0_20px_60px_rgba(20,0,60,0.7)] sm:rounded-3xl">
        <div className="pointer-events-none absolute inset-0 opacity-0" aria-hidden>
          {shots.map((s) => (
            <Image key={s.id} src={s.src} alt="" fill sizes={IMAGE_SIZES} loading="eager" />
          ))}
        </div>

        <AnimatePresence initial={false}>
          {current ? (
            <motion.div
              key={`${run}-${current.id}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.01, delay: FADE_S } }}
              transition={{ duration: FADE_S, ease: "easeInOut" }}
            >
              <Shot shot={current} camera={camera[current.id]} duration={durationOf(index)} Effects={Effects} />
            </motion.div>
          ) : (
            <TitleCard key={`${run}-title`} title={film.title} sub={film.titleSub} />
          )}
        </AnimatePresence>

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(5,0,20,0.6) 100%)" }}
        />
        <div className="film-grain pointer-events-none absolute -inset-[10%]" />
      </div>

      <div className="mt-3 flex w-full gap-1.5 px-1" aria-hidden>
        {shots.map((s, i) => (
          <span key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
            {(i < index || finished) && <span className="block h-full w-full bg-violet-300" />}
            {i === index && !finished && (
              <motion.span
                key={run}
                className="block h-full bg-[#ffd36e]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: durationOf(i) / 1000, ease: "linear" }}
              />
            )}
          </span>
        ))}
      </div>

      <div className="mt-5 min-h-24 text-center">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={`${run}-${current.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-script text-3xl text-violet-100 drop-shadow-[0_0_14px_rgba(167,139,250,0.9)] sm:text-5xl">
                {film.spoken ? <SpokenWords text={current.caption} /> : current.caption}
              </p>
              {current.subtitle && (
                <motion.p
                  className="mt-2 text-base text-[#ffe9a8] sm:text-lg"
                  initial={film.spoken ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={{ delay: film.spoken ? current.caption.split(" ").length * WORD_S + 0.6 : 0, duration: 0.6 }}
                >
                  {current.subtitle}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {finished && (
          <motion.button
            type="button"
            onClick={replay}
            className="btn-glass mt-4 px-6 py-2.5 text-base font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {film.watchAgain}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function Shot({
  shot,
  camera,
  duration,
  Effects,
}: {
  shot: FilmShot;
  camera: Camera;
  duration: number;
  Effects: Props["Effects"];
}) {
  const seconds = duration / 1000 + FADE_S;

  return (
    <>
      {shot.contain && (
        <Image
          src={shot.src}
          alt=""
          fill
          sizes={IMAGE_SIZES}
          className="scale-110 object-cover blur-2xl brightness-[0.45]"
          aria-hidden
        />
      )}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: camera.origin }}
        initial={{ scale: camera.from, x: `${camera.pan?.[0] ?? 0}%` }}
        animate={{ scale: camera.to, x: `${camera.pan?.[1] ?? 0}%` }}
        transition={{ duration: seconds, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={camera.shake ? { y: [0, -1.5, 0.5, -1, 0] } : undefined}
          transition={camera.shake ? { duration: 0.7, repeat: Infinity } : undefined}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes={IMAGE_SIZES}
            className={shot.contain ? "object-contain drop-shadow-[0_0_30px_rgba(255,211,110,0.35)]" : "object-cover"}
          />
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Effects id={shot.id} />
      </div>
    </>
  );
}

function SpokenWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <motion.span
      key={i}
      className="inline-block whitespace-pre"
      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.3 + i * WORD_S, duration: 0.4 }}
    >
      {i > 0 ? ` ${word}` : word}
    </motion.span>
  ));
}

function TitleCard({ title, sub }: { title: string; sub: string }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#2e1065_0%,#0b0425_75%)] px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: FADE_S }}
    >
      <motion.p
        className="font-script text-4xl text-[#ffd36e] drop-shadow-[0_0_18px_rgba(255,211,110,0.6)] sm:text-6xl"
        initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.4, delay: 0.3 }}
      >
        {title}
      </motion.p>
      <motion.p
        className="mt-3 text-sm tracking-[0.3em] text-violet-200/80 uppercase sm:text-base"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        {sub}
      </motion.p>
    </motion.div>
  );
}
