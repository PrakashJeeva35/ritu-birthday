"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { Sky } from "@/components/home/Sky";
import { SPECIAL_REQUIRES, rooms, type RoomId } from "@/content/rooms";
import { addProgress, useProgress } from "@/lib/progress";
import { LightFadeIn } from "./LightFadeIn";

export function RoomShell({ id, children }: { id: RoomId; children?: ReactNode }) {
  const room = rooms.find((r) => r.id === id)!;
  const progress = useProgress();
  const locked = id === "special" && !SPECIAL_REQUIRES.every((r) => progress.has(r));

  useEffect(() => {
    if (!locked) addProgress(id);
  }, [id, locked]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-dvh overflow-x-hidden text-white">
        <div className="fixed inset-0">
          <Sky celebrating={false} />
        </div>

        <Link
          href="/gift"
          className="btn-glass fixed left-5 top-5 z-50 flex items-center gap-2 px-4 py-2 text-sm font-bold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to the doors
        </Link>

        <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-4 px-3 py-24 text-center sm:px-6">
          <motion.h1
            className="font-script text-6xl sm:text-8xl"
            style={{ color: room.theme.frame, textShadow: `0 0 24px ${room.theme.glow}` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 12 }}
          >
            {room.label}
          </motion.h1>
          <motion.div
            className="ornament -mt-2 mb-2"
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="size-3.5">
              <path d="M12 0c.6 7.2 4.8 11.4 12 12-7.2.6-11.4 4.8-12 12-.6-7.2-4.8-11.4-12-12 7.2-.6 11.4-4.8 12-12z" fill="currentColor" />
            </svg>
          </motion.div>

          {locked ? (
            <p className="text-lg text-violet-100/80">This door is still locked. Visit the other two first.</p>
          ) : (
            children ?? (
              <motion.p
                className="text-lg text-violet-100/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {room.tagline}... this room is being prepared for you.
              </motion.p>
            )
          )}
        </section>

        <LightFadeIn />
      </main>
    </MotionConfig>
  );
}
