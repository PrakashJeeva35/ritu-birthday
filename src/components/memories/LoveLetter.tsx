"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { letter } from "@/content/memories";
import { Portal } from "@/components/Portal";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

const OPEN_TO_READ_MS = 1500;

export function LoveLetter() {
  const [opened, setOpened] = useState(false);
  const [reading, setReading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useBodyScrollLock(reading);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const open = () => {
    if (opened) {
      setReading(true);
      return;
    }
    setOpened(true);
    timer.current = setTimeout(() => {
      setReading(true);
      confetti({
        particleCount: 90,
        spread: 80,
        startVelocity: 35,
        origin: { y: 0.55 },
        colors: ["#ffd36e", "#c084fc", "#a78bfa", "#7dd3fc", "#fff7d6"],
        shapes: ["star", "circle"],
        zIndex: 80,
        disableForReducedMotion: true,
      });
    }, OPEN_TO_READ_MS);
  };

  return (
    <section className="flex w-full flex-col items-center">
      <motion.h2
        className="mb-32 font-script text-5xl text-[#ffd36e] sm:mb-40 sm:text-7xl"
        style={{ textShadow: "0 0 22px rgba(255,211,110,0.6)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
      >
        {letter.title}
      </motion.h2>

      <motion.button
        type="button"
        onClick={open}
        aria-label={opened ? letter.readAgain : `${letter.title}. ${letter.tapToOpen}`}
        className="relative h-48 w-72 cursor-pointer rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-[#ffd36e] sm:h-60 sm:w-96"
        style={{ perspective: 1000 }}
        initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={opened ? undefined : { scale: 1.04, rotate: -1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        {!opened && (
          <motion.span
            aria-hidden
            className="absolute -inset-3 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 20px 4px rgba(192,132,252,0.35)",
                "0 0 46px 12px rgba(255,211,110,0.45)",
                "0 0 20px 4px rgba(192,132,252,0.35)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        )}

        <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#4c1d95] to-[#2e1065]" />

        <motion.span
          className="absolute inset-x-4 bottom-3 top-3 flex flex-col items-start rounded-md bg-[#fdf8ee] px-4 pt-3 text-left shadow-md sm:px-6 sm:pt-5"
          initial={false}
          animate={{ y: opened ? "-58%" : "0%" }}
          transition={{ delay: opened ? 0.55 : 0, duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-script text-2xl text-[#4c1d95] sm:text-3xl">{letter.greeting}</span>
          <span className="mt-2 h-1.5 w-11/12 rounded bg-violet-200" />
          <span className="mt-2 h-1.5 w-9/12 rounded bg-violet-200" />
          <span className="mt-2 h-1.5 w-10/12 rounded bg-violet-200" />
        </motion.span>

        <span
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.25)]"
          style={{ clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <span
          className="absolute inset-0 rounded-xl"
          style={{
            clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
            background: "linear-gradient(0deg, rgba(46,16,101,0.55), rgba(46,16,101,0))",
          }}
        />

        <motion.span
          className="absolute inset-x-0 top-0 h-[60%] origin-top rounded-t-xl bg-gradient-to-b from-[#a78bfa] to-[#6d28d9]"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          initial={false}
          animate={{ rotateX: opened ? 180 : 0, zIndex: opened ? -1 : 20 }}
          transition={{
            rotateX: { duration: 0.6, ease: "easeInOut" },
            zIndex: { delay: opened ? 0.3 : 0, duration: 0 },
          }}
        />

        <AnimatePresence>
          {!opened && (
            <motion.span
              key="seal"
              className="absolute left-1/2 top-[60%] z-30 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#e6b84f] bg-gradient-to-br from-[#ffd36e] to-[#b7791f] font-script text-3xl text-[#4c1d95] shadow-lg sm:size-16"
              exit={{ scale: [1, 1.25, 0], rotate: 25, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              R
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.p
        key={opened ? "again" : "tap"}
        className="mt-6 text-base text-violet-100/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {opened ? letter.readAgain : letter.tapToOpen}
      </motion.p>

      <Portal>
        <AnimatePresence>
          {reading && <LetterSheet onClose={() => setReading(false)} />}
        </AnimatePresence>
      </Portal>
    </section>
  );
}

function LetterSheet({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={letter.title}
      className="fixed inset-0 z-[70] overflow-y-auto bg-[#0b0425]/80 px-4 py-14 backdrop-blur-md sm:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="relative mx-auto max-w-xl rounded-2xl border-2 border-[#e6b84f]/70 px-7 pb-10 pt-12 text-left text-[#2e1065] shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:px-12 sm:pt-14"
        style={{
          backgroundColor: "#fdf8ee",
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0, transparent 31px, rgba(139,92,246,0.12) 31px, rgba(139,92,246,0.12) 32px)",
        }}
        initial={{ y: 120, scale: 0.85, rotate: -3, opacity: 0 }}
        animate={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
        exit={{ y: 80, scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={letter.close}
          onClick={onClose}
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full text-[#6d28d9] transition hover:bg-violet-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <motion.h3
          className="font-script text-4xl text-[#4c1d95] sm:text-5xl"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {letter.greeting}
        </motion.h3>

        {letter.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            className="mt-5 text-base leading-8 sm:text-lg sm:leading-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.6, duration: 0.7 }}
          >
            {p}
          </motion.p>
        ))}

        <motion.div
          className="mt-8 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 + letter.paragraphs.length * 0.6, duration: 0.8 }}
        >
          <p className="text-base sm:text-lg">{letter.closing}</p>
          <p className="font-script text-4xl text-[#6d28d9] sm:text-5xl">{letter.signature}</p>
        </motion.div>

        <motion.p
          className="mt-10 flex items-center justify-center gap-2 whitespace-nowrap font-script text-4xl text-[#b91c1c] sm:gap-3 sm:text-6xl"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 + letter.paragraphs.length * 0.6, type: "spring", stiffness: 140, damping: 12 }}
        >
          {letter.loveLine}
          <svg className="heart-beat size-9 shrink-0 sm:size-11" viewBox="0 0 24 22" aria-hidden>
            <path
              d="M12 21s-8-5.2-10.4-10C-0.4 6.8 2.3 2 6.6 2 9 2 10.7 3.4 12 5.2 13.3 3.4 15 2 17.4 2c4.3 0 7 4.8 5 9-2.4 4.8-10.4 10-10.4 10z"
              fill="#dc2626"
              stroke="#991b1b"
              strokeWidth="0.8"
            />
          </svg>
        </motion.p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-6 py-2.5 text-base font-medium text-white shadow-lg transition hover:brightness-110"
          >
            {letter.close}
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
}
