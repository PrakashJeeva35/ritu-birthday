"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { chapters, memoriesIntro } from "@/content/memories";
import { Lightbox } from "./Lightbox";
import { LoveLetter } from "./LoveLetter";
import { MemoryChapter } from "./MemoryChapter";

const allPhotos = chapters.flatMap((c) => c.photos);
const chapterStarts = chapters.map((_, i) =>
  chapters.slice(0, i).reduce((sum, c) => sum + c.photos.length, 0),
);

export function MemoriesRoom() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <div className="flex w-full flex-col items-center gap-24 sm:gap-32">
      <motion.div
        className="flex flex-col items-center gap-1 text-violet-100/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-lg">{memoriesIntro.hint}</p>
        <p className="text-sm text-violet-200/60">{memoriesIntro.letterHint}</p>
        <motion.svg
          className="mt-4 text-violet-200/70"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>

      {chapters.map((chapter, i) => (
        <MemoryChapter
          key={chapter.id}
          chapter={chapter}
          index={i}
          firstPhotoIndex={chapterStarts[i]}
          onOpen={setOpenIndex}
        />
      ))}

      <LoveLetter />

      <Lightbox photos={allPhotos} index={openIndex} onChange={setOpenIndex} onClose={close} />
    </div>
  );
}
