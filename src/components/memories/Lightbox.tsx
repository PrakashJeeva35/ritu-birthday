"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Memory } from "@/content/memories";
import { Portal } from "@/components/Portal";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

const SWIPE_PX = 70;

export function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Memory[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  useBodyScrollLock(open);

  const prev = () => index !== null && onChange((index - 1 + photos.length) % photos.length);
  const next = () => index !== null && onChange((index + 1) % photos.length);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onChange((index + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, photos.length, onChange, onClose]);

  const photo = index !== null ? photos[index] : null;

  const overlay = (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#0b0425]/90 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={photo.src}
              className="flex max-w-full touch-pan-y flex-col items-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_PX) next();
                else if (info.offset.x > SWIPE_PX) prev();
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-md bg-[#fdfbf7] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:p-3">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="92vw"
                  draggable={false}
                  className="h-auto max-h-[68dvh] w-auto max-w-[86vw] select-none"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <span className="block font-script text-3xl text-violet-50 sm:text-4xl">{photo.caption}</span>
                <span className="mt-1 block text-sm text-violet-200/70">
                  {index + 1} / {photos.length}
                  <span className="sm:hidden"> · swipe for more</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <NavButton side="left" label="Previous photo" onClick={prev} />
          <NavButton side="right" label="Next photo" onClick={next} />

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="btn-glass absolute right-4 top-4 flex size-11 items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return <Portal>{overlay}</Portal>;
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`btn-glass absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center sm:flex ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={side === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}
