"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Sky } from "@/components/home/Sky";
import { PARTY_COLORS } from "@/components/home/scene";
import { SPECIAL_REQUIRES, hall, rooms, type RoomId } from "@/content/rooms";
import { addProgress, resetProgress, useProgress } from "@/lib/progress";
import { Door } from "./Door";
import { LightFadeIn } from "./LightFadeIn";

const UNLOCK_SHAKE_AT_MS = 1600;
const UNLOCK_BREAK_AT_MS = 2700;
const DOOR_OPEN_MS = 1100;

export function GiftHall() {
  const router = useRouter();
  const progress = useProgress();
  const specialDoorRef = useRef<HTMLButtonElement>(null);
  const [opening, setOpening] = useState<RoomId | null>(null);
  const [nudge, setNudge] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [unlockStarted, setUnlockStarted] = useState(false);

  const specialUnlocked = SPECIAL_REQUIRES.every((id) => progress.has(id));
  const unlockSeen = progress.has("special-unlock-seen");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("reset")) resetProgress();
    rooms.forEach((room) => router.prefetch(room.href));
  }, [router]);

  useEffect(() => {
    if (!specialUnlocked || unlockSeen) return;
    const shake = setTimeout(() => setUnlockStarted(true), UNLOCK_SHAKE_AT_MS);
    const unlock = setTimeout(() => {
      addProgress("special-unlock-seen");
      setHint(hall.unlockedHint);
      const rect = specialDoorRef.current?.getBoundingClientRect();
      if (rect) {
        confetti({
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
          colors: ["#ffd36e", "#fff4c2", ...PARTY_COLORS],
          shapes: ["star"],
          particleCount: 120,
          spread: 360,
          startVelocity: 30,
          disableForReducedMotion: true,
          zIndex: 35,
        });
      }
    }, UNLOCK_BREAK_AT_MS);
    return () => {
      clearTimeout(shake);
      clearTimeout(unlock);
    };
  }, [specialUnlocked, unlockSeen]);

  useEffect(() => {
    if (!hint) return;
    const id = setTimeout(() => setHint(null), 3000);
    return () => clearTimeout(id);
  }, [hint]);

  function select(id: RoomId, href: string) {
    if (opening) return;
    if (id === "special" && !specialUnlocked) {
      setNudge((n) => n + 1);
      setHint(hall.lockedHint);
      return;
    }
    setOpening(id);
    setTimeout(() => router.push(href), DOOR_OPEN_MS);
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-dvh overflow-x-hidden text-white">
        <div className="fixed inset-0">
          <Sky celebrating={false} />
          <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-[radial-gradient(60%_70%_at_50%_100%,rgba(124,58,237,0.55),transparent_70%)]" />
        </div>

        <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-10 px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <motion.p
              className="eyebrow mb-3"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ duration: 1.2 }}
            >
              {hall.eyebrow}
            </motion.p>
            <motion.h1
              className="font-script text-[3.4rem] leading-tight text-[#fff1c1] drop-shadow-[0_0_18px_rgba(255,211,110,0.5)] sm:text-7xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {hall.title}
            </motion.h1>
            <motion.p
              className="mt-2 font-display text-lg italic text-violet-100/85 sm:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {hall.subtitle}
            </motion.p>
          </div>

          <div className="flex items-start justify-center gap-5 sm:gap-12">
            {rooms.map((room, index) => {
              const isSpecial = room.id === "special";
              return (
                <Door
                  key={room.id}
                  ref={isSpecial ? specialDoorRef : undefined}
                  room={room}
                  index={index}
                  locked={isSpecial && !specialUnlocked}
                  lockVisible={isSpecial && (!specialUnlocked || !unlockSeen)}
                  unlocking={isSpecial && specialUnlocked && !unlockSeen && unlockStarted}
                  visited={progress.has(room.id)}
                  opening={opening === room.id}
                  nudge={isSpecial ? nudge : 0}
                  onSelect={() => select(room.id, room.href)}
                />
              );
            })}
          </div>

          <div className="h-8">
            <AnimatePresence mode="wait">
              {hint && (
                <motion.p
                  key={hint}
                  className="text-center text-sm text-[#ffe9a8] drop-shadow-[0_0_10px_rgba(255,211,110,0.7)] sm:text-base"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {hint}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>

        <AnimatePresence>
          {opening && (
            <motion.div
              key="door-light"
              className="pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(circle_at_50%_55%,#fff8dc_0%,#ffd36e_35%,#a78bfa_85%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.65, ease: "easeIn" }}
            />
          )}
        </AnimatePresence>

        <LightFadeIn />
      </main>
    </MotionConfig>
  );
}
