"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Memory } from "@/content/memories";

const TAPE_COLORS = ["#c4b5fd", "#7dd3fc", "#fde68a", "#5eead4", "#a5b4fc"];

export function Polaroid({
  memory,
  index,
  rotate,
  onOpen,
}: {
  memory: Memory;
  index: number;
  rotate: number;
  onOpen: () => void;
}) {
  const landscape = memory.width > memory.height;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open photo: ${memory.caption}`}
      className={`group relative shrink-0 cursor-zoom-in rounded-sm bg-[#fdfbf7] p-2 pb-3 text-left shadow-[0_14px_30px_rgba(10,0,40,0.55)] outline-none focus-visible:ring-4 focus-visible:ring-[#ffd36e] sm:p-3 sm:pb-4 ${
        landscape ? "w-48 sm:w-72" : "w-36 sm:w-52"
      }`}
      initial={{ opacity: 0, y: 50, rotate: rotate * 2.5, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 140, damping: 14, delay: (index % 5) * 0.08 }}
    >
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rounded-[2px] opacity-80 shadow-sm"
        style={{
          background: TAPE_COLORS[index % TAPE_COLORS.length],
          rotate: `${index % 2 ? 4 : -5}deg`,
        }}
      />
      <span
        className={`relative block w-full overflow-hidden bg-violet-950 ${
          landscape ? "aspect-[5/4]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={memory.src}
          alt={memory.alt}
          fill
          sizes={landscape ? "(min-width: 640px) 288px, 192px" : "(min-width: 640px) 208px, 144px"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: memory.focus ?? "50% 50%" }}
        />
      </span>
      <span className="mt-2 block min-h-[2.5em] text-center font-script text-lg leading-tight text-[#3b0764] sm:text-2xl">
        {memory.caption}
      </span>
    </motion.button>
  );
}
