"use client";

import { motion } from "framer-motion";
import type { Aim, Phase } from "./scene";

const INK = "#120a33";
const GOLD = "#ffd36e";
const VIOLET = "#a78bfa";

// Local space: bow shoulder at (0, 0), feet at y = 80. The arms group is rotated along the aim.
const STRING_DRAWN = "M44 -36 L2 0 L44 36";
const STRING_RELEASED = "M44 -36 L44 0 L44 36";
const STRING_VIBRATION = [
  STRING_DRAWN,
  "M44 -36 L58 0 L44 36",
  "M44 -36 L39 0 L44 36",
  "M44 -36 L47 0 L44 36",
  STRING_RELEASED,
];
const BACK_ARM_DRAWN = "M-6 2 L-16 10 L2 0";
const BACK_ARM_RELEASED = "M-6 2 L-24 12 L-20 0";

const SCARF_A = "M-4 -9 C-14 -8 -22 -14 -34 -10";
const SCARF_B = "M-4 -9 C-14 -12 -24 -6 -36 -14";
const SCARF_TAIL_A = "M-4 -8 C-12 -2 -20 -6 -28 0";
const SCARF_TAIL_B = "M-4 -8 C-12 -6 -22 2 -30 -4";

export function Archer({ phase, aim }: { phase: Phase; aim: Aim }) {
  const released = phase === "flying" || phase === "blast" || phase === "reveal";

  return (
    <motion.svg
      className="pointer-events-none absolute z-20 overflow-visible drop-shadow-[0_0_6px_rgba(167,139,250,0.9)]"
      style={{ left: aim.shoulder.x, top: aim.shoulder.y }}
      width="1"
      height="1"
      initial={false}
      animate={{ opacity: phase === "reveal" ? 0 : 1 }}
      transition={{ duration: 1 }}
      aria-hidden
    >
      <g transform={`scale(${aim.scale})`}>
        <motion.g
          animate={{ y: [0, -1.2, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Legs in a wide archer's stance */}
          <path d="M-8 34 L-14 56 L-26 79" stroke={INK} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M-4 34 L6 56 L14 79" stroke={INK} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M-31 80 L-20 80 M10 80 L22 80" stroke={INK} strokeWidth="5" strokeLinecap="round" />

          {/* Quiver with arrows on the back */}
          <path d="M-15 -8 L-24 26" stroke="#2a1a5e" strokeWidth="8" strokeLinecap="round" />
          <path d="M-16 -10 L-12 -20 M-19 -9 L-19 -20 M-22 -8 L-26 -18" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />

          {/* Scarf fluttering in the wind */}
          <motion.path
            d={SCARF_A}
            stroke={VIOLET}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            animate={{ d: [SCARF_A, SCARF_B, SCARF_A] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d={SCARF_TAIL_A}
            stroke="#c4b5fd"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            animate={{ d: [SCARF_TAIL_A, SCARF_TAIL_B, SCARF_TAIL_A] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Torso, belt, neck and head */}
          <path d="M-15 -6 Q-4 -13 8 -6 L4 36 L-15 36 Z" fill={INK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M-15 29 L4 29" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="-5" y="-14" width="7" height="8" rx="2" fill={INK} />
          <circle cx="0" cy="-23" r="10.5" fill={INK} />
          <path d="M-11 -24 Q-11 -36 0 -35 Q10 -34 11 -25 Q4 -29 -2 -26 Q-7 -23 -10 -17 Z" fill={INK} />
          <path d="M9 -25 L11 -21" stroke={INK} strokeWidth="3" strokeLinecap="round" />

          <g transform={`rotate(${aim.angle})`}>
            <path d="M0 0 L52 0" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            <path d="M44 -36 Q64 0 44 36" stroke={GOLD} strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="44" cy="-36" r="2" fill={GOLD} />
            <circle cx="44" cy="36" r="2" fill={GOLD} />
            <motion.path
              d={STRING_DRAWN}
              stroke="#f5f3ff"
              strokeWidth="1.3"
              fill="none"
              initial={false}
              animate={{ d: released ? STRING_VIBRATION : STRING_DRAWN }}
              transition={{ duration: released ? 0.5 : 0.4 }}
            />
            <motion.path
              d={BACK_ARM_DRAWN}
              stroke={INK}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={false}
              animate={{ d: released ? BACK_ARM_RELEASED : BACK_ARM_DRAWN }}
              transition={{ duration: 0.25 }}
            />
            <circle cx="52" cy="0" r="5" fill={INK} />
          </g>
        </motion.g>
      </g>
    </motion.svg>
  );
}
