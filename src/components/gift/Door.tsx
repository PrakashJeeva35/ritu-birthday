"use client";

import type { Ref } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Room, RoomId } from "@/content/rooms";

function DoorIcon({ id }: { id: RoomId }) {
  if (id === "dreams") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" fill="none" aria-hidden>
        <path d="M15 3a8 8 0 1 0 6 13.3A7 7 0 0 1 15 3z" fill="#e0f2fe" />
        <path d="M6 4l.6 1.4L8 6l-1.4.6L6 8l-.6-1.4L4 6l1.4-.6z" fill="#ffd36e" />
        <path d="M19 9l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4z" fill="#ffd36e" />
      </svg>
    );
  }
  if (id === "memories") {
    return (
      <svg viewBox="0 0 24 24" className="size-full" fill="none" aria-hidden>
        <rect x="3" y="6" width="18" height="14" rx="2" fill="#ede9fe" />
        <path d="M8 6l1.5-2h5L16 6" fill="#ede9fe" />
        <circle cx="12" cy="13" r="4" fill="#7c3aed" />
        <circle cx="12" cy="13" r="2" fill="#c4b5fd" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z" fill="#fff4c2" />
    </svg>
  );
}

function Lock({ nudge, unlocking }: { nudge: number; unlocking: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0.9 } }}
    >
      {[35, -35].map((angle) => (
        <motion.div
          key={angle}
          className="absolute h-2.5 w-[150%] rounded-full bg-[repeating-linear-gradient(90deg,#e5e7eb_0_9px,#6b7280_9px_13px)] shadow-[0_2px_6px_rgba(0,0,0,0.5)] sm:h-3"
          style={{ rotate: angle }}
          exit={{ x: angle > 0 ? 160 : -160, y: 80, opacity: 0, transition: { duration: 0.8 } }}
        />
      ))}
      <motion.div
        key={nudge}
        className="relative size-12 sm:size-16"
        animate={
          unlocking
            ? { rotate: [0, -12, 12, -12, 12, 0], scale: [1, 1.2, 1.2, 1.2, 1.2, 1] }
            : nudge > 0
              ? { rotate: [0, -16, 14, -10, 6, 0] }
              : {}
        }
        transition={{ duration: unlocking ? 1 : 0.5 }}
        exit={{ y: 140, rotate: 50, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }}
      >
        <svg viewBox="0 0 24 24" className="size-full drop-shadow-[0_0_10px_rgba(255,211,110,0.9)]" aria-hidden>
          <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="#e5e7eb" strokeWidth="2.5" fill="none" />
          <rect x="4" y="10" width="16" height="12" rx="2.5" fill="#ffd36e" />
          <circle cx="12" cy="15" r="1.8" fill="#78350f" />
          <rect x="11.2" y="15.5" width="1.6" height="3.5" rx="0.8" fill="#78350f" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function Door({
  room,
  index,
  locked,
  lockVisible,
  unlocking,
  visited,
  opening,
  nudge,
  onSelect,
  ref,
}: {
  room: Room;
  index: number;
  locked: boolean;
  lockVisible: boolean;
  unlocking: boolean;
  visited: boolean;
  opening: boolean;
  nudge: number;
  onSelect: () => void;
  ref?: Ref<HTMLButtonElement>;
}) {
  const { theme } = room;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onSelect}
      aria-label={locked ? `${room.label} (locked)` : room.label}
      className="group flex flex-col items-center gap-3 outline-none"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.2, type: "spring", stiffness: 90, damping: 14 }}
      whileHover={locked ? undefined : { y: -8 }}
    >
      <div className="relative h-44 w-24 sm:h-72 sm:w-40 lg:h-80 lg:w-44" style={{ perspective: 900 }}>
        <div
          className="door-glow absolute -inset-4 rounded-t-full opacity-50 blur-2xl transition-opacity group-hover:opacity-90"
          style={{ background: theme.glow, animationDelay: `${index * 0.5}s` }}
        />
        <div className="absolute inset-0 rounded-t-full bg-[radial-gradient(circle_at_50%_65%,#fffbea_0%,#ffd36e_40%,#7c3aed_100%)]" />

        <motion.div
          className="absolute inset-0 origin-left overflow-hidden rounded-t-full shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"
          style={{ background: theme.panel, backfaceVisibility: "hidden" }}
          animate={{ rotateY: opening ? -105 : 0 }}
          transition={{ duration: 1, ease: [0.6, 0, 0.4, 1] }}
        >
          <div className="absolute inset-x-[18%] top-[14%] h-[34%] rounded-t-full border-2 border-white/15" />
          <div className="absolute inset-x-[18%] bottom-[8%] h-[34%] rounded-md border-2 border-white/15" />
          <div className="absolute left-1/2 top-[22%] size-9 -translate-x-1/2 sm:size-14">
            <DoorIcon id={room.id} />
          </div>
          <span className="absolute right-[12%] top-[56%] size-2.5 rounded-full bg-[#ffd36e] shadow-[0_0_10px_#ffd36e] sm:size-3.5" />
        </motion.div>

        <div
          className="pointer-events-none absolute -inset-1.5 rounded-t-full border-4 sm:border-[6px]"
          style={{ borderColor: theme.frame, boxShadow: `0 0 18px ${theme.glow}, inset 0 0 12px ${theme.glow}` }}
        />

        {visited && (
          <span
            className="absolute -right-2 -top-1 flex size-6 items-center justify-center rounded-full text-[#1a0b4a] shadow-lg sm:size-7"
            style={{ background: theme.frame }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L19 7" />
            </svg>
          </span>
        )}

        <AnimatePresence>{lockVisible && <Lock key="lock" nudge={nudge} unlocking={unlocking} />}</AnimatePresence>
      </div>

      <span className="text-center font-display text-lg font-bold leading-tight sm:text-2xl" style={{ color: theme.frame, textShadow: `0 0 12px ${theme.glow}` }}>
        {room.label}
      </span>
      <span className="hidden max-w-44 text-center font-display text-base italic text-violet-100/80 sm:block">{room.tagline}</span>
    </motion.button>
  );
}
