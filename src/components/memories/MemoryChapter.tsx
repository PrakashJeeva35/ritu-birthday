"use client";

import { motion } from "framer-motion";
import type { Chapter } from "@/content/memories";
import { seededRandom } from "@/lib/random";
import { Polaroid } from "./Polaroid";

const TITLE_COLORS = ["#7dd3fc", "#ffd36e", "#c084fc", "#5eead4"];

export function MemoryChapter({
  chapter,
  index,
  firstPhotoIndex,
  onOpen,
}: {
  chapter: Chapter;
  index: number;
  firstPhotoIndex: number;
  onOpen: (photoIndex: number) => void;
}) {
  const rand = seededRandom(101 + index * 17);
  const rotations = chapter.photos.map(() => Math.round((rand() * 2 - 1) * 6));
  const color = TITLE_COLORS[index % TITLE_COLORS.length];

  return (
    <section className="flex w-full flex-col items-center">
      <motion.div
        className="mb-8 flex flex-col items-center sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
      >
        <span className="mb-2 text-sm font-semibold tracking-[0.3em] text-violet-200/70 uppercase">
          Chapter {index + 1}
        </span>
        <h2
          className="font-script text-5xl sm:text-7xl"
          style={{ color, textShadow: `0 0 22px ${color}99` }}
        >
          {chapter.title}
        </h2>
        <p className="mt-2 text-base text-violet-100/80 sm:text-lg">{chapter.subtitle}</p>
        <motion.span
          className="mt-4 h-0.5 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          initial={{ width: 0 }}
          whileInView={{ width: 180 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      <div className="flex max-w-5xl flex-wrap items-start justify-center gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12">
        {chapter.photos.map((memory, i) => (
          <Polaroid
            key={memory.src}
            memory={memory}
            index={firstPhotoIndex + i}
            rotate={rotations[i]}
            onOpen={() => onOpen(firstPhotoIndex + i)}
          />
        ))}
      </div>
    </section>
  );
}
