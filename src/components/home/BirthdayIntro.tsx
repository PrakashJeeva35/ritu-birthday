"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useMusic } from "@/components/music/MusicProvider";
import { site } from "@/content/site";
import { useViewport } from "@/lib/useViewport";
import { Arrow } from "./Arrow";
import { HeartsAndStars } from "./HeartsAndStars";
import { Clouds } from "./Clouds";
import { Land } from "./Land";
import { Moon } from "./Moon";
import { Reveal } from "./Reveal";
import { Sky } from "./Sky";
import { launchSparks, moonBlast, randomFirework, sideCannons } from "./celebrate";
import { Archer } from "./Archer";
import {
  BLAST_MS,
  FLIGHT_MS,
  READY_MS,
  aimAtMoon,
  moonPosition,
  type Phase,
} from "./scene";

export function BirthdayIntro() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState(0);
  const { width, height } = useViewport();
  const { playFromStart } = useMusic();
  const moon = moonPosition(width);
  const aim = width > 0 ? aimAtMoon(width, height) : null;
  const launch = aim ? { x: aim.tip.x / width, y: aim.tip.y / height } : { x: 0.45, y: 0.72 };
  const celebrating = phase === "blast" || phase === "reveal";
  const arrowVisible = phase === "idle" || phase === "ready" || phase === "flying";

  useEffect(() => {
    if (run === 0) return;
    const timers = [
      setTimeout(() => setPhase("flying"), READY_MS),
      setTimeout(() => setPhase("blast"), READY_MS + FLIGHT_MS),
      setTimeout(() => setPhase("reveal"), READY_MS + FLIGHT_MS + BLAST_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [run]);

  useEffect(() => {
    if (phase === "flying") {
      const { tip } = aimAtMoon(window.innerWidth, window.innerHeight);
      launchSparks({ x: tip.x / window.innerWidth, y: tip.y / window.innerHeight });
    }
    if (phase === "blast") {
      moonBlast(moonPosition(window.innerWidth));
      const timers = [800, 1500, 2200].map((ms) => setTimeout(randomFirework, ms));
      return () => timers.forEach(clearTimeout);
    }
    if (phase === "reveal") {
      sideCannons();
      const id = setInterval(randomFirework, 2600);
      return () => clearInterval(id);
    }
  }, [phase]);

  function start() {
    playFromStart();
    setPhase("ready");
    setRun((r) => r + 1);
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-dvh overflow-x-hidden text-white">
        <div className="fixed inset-0 overflow-hidden">
          <Sky celebrating={celebrating} />
          <Moon phase={phase} />
          <Clouds layer="back" flying={phase === "flying"} dimmed={celebrating} launch={launch} moon={moon} />
          <Land />
          {aim && <Archer phase={phase} aim={aim} />}
          {aim && arrowVisible && <Arrow phase={phase} aim={aim} />}
          <Clouds layer="front" flying={phase === "flying"} dimmed={celebrating} launch={launch} moon={moon} />

          <AnimatePresence>
            {phase === "ready" && (
              <motion.p
                key="wish"
                className="absolute inset-x-0 top-[89%] z-40 text-center font-script text-4xl text-[#fff1c1] drop-shadow-[0_0_14px_rgba(255,211,110,0.6)] sm:text-5xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
              >
                {site.wishHint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              key="start"
              className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(7,3,24,0.15),rgba(7,3,24,0.7)_75%)] px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6 } }}
            >
              <motion.div
                className="glass flex w-full max-w-sm flex-col items-center gap-5 rounded-[2rem] px-7 py-9 sm:max-w-md sm:px-10"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <p className="eyebrow">{site.startEyebrow}</p>
                <div className="ornament" aria-hidden>
                  <svg viewBox="0 0 24 24" className="star-spin size-4 [animation-duration:8s]">
                    <path d="M12 0c.6 7.2 4.8 11.4 12 12-7.2.6-11.4 4.8-12 12-.6-7.2-4.8-11.4-12-12 7.2-.6 11.4-4.8 12-12z" fill="currentColor" />
                  </svg>
                </div>
                <p className="font-script text-[2.6rem] leading-tight text-[#fff1c1] drop-shadow-[0_0_16px_rgba(255,211,110,0.45)] sm:text-5xl">
                  {site.startPrompt}
                </p>
                <motion.button
                  type="button"
                  onClick={start}
                  className="btn-gold mt-2 flex items-center gap-2.5 px-8 py-3.5 text-lg"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 180, damping: 14 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" />
                  </svg>
                  {site.startButton}
                </motion.button>
                <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-violet-100/70">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M4 9.5v5h4l5 4v-13l-5 4H4z" fill="currentColor" stroke="none" />
                    <path d="M16.5 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />
                  </svg>
                  {site.soundHint}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {celebrating && <HeartsAndStars />}

        <AnimatePresence>
          {phase === "blast" && (
            <motion.div
              key="flash"
              className="pointer-events-none fixed inset-0 z-50 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0] }}
              transition={{ duration: 0.8, times: [0, 0.15, 1] }}
            />
          )}
        </AnimatePresence>

        {phase === "reveal" && <Reveal key={run} />}

        {phase === "reveal" && (
          <motion.button
            type="button"
            onClick={start}
            className="btn-glass fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-4 py-2 text-sm font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Replay
          </motion.button>
        )}
      </main>
    </MotionConfig>
  );
}
