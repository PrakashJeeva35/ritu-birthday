"use client";

import { motion } from "framer-motion";
import { seededRandom } from "@/lib/random";

const STAR_COLORS = ["#ffffff", "#ffe9a8", "#c4b5fd", "#b9e6ff", "#d9c2ff"];

const rand = seededRandom(7);
const STARS = Array.from({ length: 140 }, (_, id) => ({
  id,
  left: rand() * 100,
  top: rand() * 78,
  size: 1 + rand() * 2.5,
  delay: rand() * 4,
  duration: 2 + rand() * 3,
  color: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
}));

const SPARKLES = Array.from({ length: 9 }, (_, id) => ({
  id,
  left: 4 + rand() * 92,
  top: 3 + rand() * 60,
  size: 7 + rand() * 7,
  delay: rand() * 5,
  duration: 3 + rand() * 3,
}));

const SHOOTING_STARS = [
  { top: "8%", left: "90%", delay: "1s" },
  { top: "22%", left: "60%", delay: "4.5s" },
  { top: "4%", left: "40%", delay: "8s" },
];

export function Sky({ celebrating }: { celebrating: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#070318_0%,#100838_30%,#22104f_58%,#3d1d78_82%,#55308f_100%)]" />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,#0c0530_0%,#24106a_38%,#4a249f_68%,#6d3fc0_88%,#8c63d6_100%)]"
        initial={false}
        animate={{ opacity: celebrating ? 1 : 0 }}
        transition={{ duration: 2.5 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(70%_60%_at_50%_100%,rgba(255,200,110,0.35),transparent_70%)]"
        initial={false}
        animate={{ opacity: celebrating ? 1 : 0.35 }}
        transition={{ duration: 2.5 }}
      />
      <div className="absolute -inset-x-1/4 top-[8%] h-[38%] -rotate-[18deg] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(196,181,253,0.16),rgba(125,211,252,0.06)_45%,transparent_75%)] blur-2xl" />
      <div className="aurora absolute -inset-[20%]" />

      {STARS.map((star) => (
        <span
          key={star.id}
          className="star absolute rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            background: star.color,
            boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {SPARKLES.map((s) => (
        <svg
          key={s.id}
          className="star absolute"
          viewBox="0 0 24 24"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            filter: "drop-shadow(0 0 6px rgba(255,241,193,0.9))",
          }}
        >
          <path d="M12 0c.6 7.2 4.8 11.4 12 12-7.2.6-11.4 4.8-12 12-.6-7.2-4.8-11.4-12-12 7.2-.6 11.4-4.8 12-12z" fill="#fff6d8" />
        </svg>
      ))}

      {SHOOTING_STARS.map((s) => (
        <span
          key={s.left}
          className="shooting-star"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}
    </div>
  );
}
