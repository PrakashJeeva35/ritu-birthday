"use client";

import { motion } from "framer-motion";
import { ARROW_HEIGHT, ARROW_LENGTH, FLIGHT_MS, type Aim, type Phase } from "./scene";

export function Arrow({ phase, aim }: { phase: Phase; aim: Aim }) {
  const { tip: start, moon: target, angle } = aim;
  const flying = phase === "flying";

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
      <motion.div
        className="absolute size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,211,110,0.7),transparent_70%)]"
        style={{ left: start.x, top: start.y }}
        animate={flying ? { scale: 2.4, opacity: 0 } : { scale: [1, 1.35, 1], opacity: 1 }}
        transition={flying ? { duration: 0.6 } : { duration: 1.2, repeat: Infinity }}
      />

      <motion.div
        className="absolute"
        style={{ left: start.x, top: start.y }}
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={
          flying
            ? { opacity: 1, x: target.x - start.x, y: target.y - start.y }
            : { opacity: 1, x: 0, y: 0 }
        }
        transition={
          flying ? { duration: FLIGHT_MS / 1000, ease: "easeIn" } : { duration: 0.5 }
        }
      >
        {/* Rotate around the arrow tip so the tip stays on the flight path. */}
        <div style={{ transform: `rotate(${angle}deg)`, transformOrigin: "0 0" }}>
          <div className="absolute right-0 top-0 flex -translate-y-1/2 items-center">
            <motion.div
              className="h-1.5 rounded-full bg-[linear-gradient(90deg,transparent,#818cf8,#c084fc,#ffd36e)] shadow-[0_0_16px_#c084fc]"
              initial={{ width: 0 }}
              animate={{ width: flying ? 300 : 0 }}
              transition={{ duration: flying ? 1.5 : 0.3 }}
            />
            <svg
              width={ARROW_LENGTH * aim.scale}
              height={ARROW_HEIGHT * aim.scale}
              viewBox={`0 0 ${ARROW_LENGTH} ${ARROW_HEIGHT}`}
              className="drop-shadow-[0_0_8px_#ffd36e]"
            >
              <defs>
                <linearGradient id="arrow-head" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff4c2" />
                  <stop offset="100%" stopColor="#ffb347" />
                </linearGradient>
              </defs>
              <path d="M8 12 H68" stroke="#ffe9b0" strokeWidth="3" strokeLinecap="round" />
              <path d="M62 4 L84 12 L62 20 L67 12 Z" fill="url(#arrow-head)" />
              <path d="M2 4 L14 12 L2 20 L8 12 Z" fill="#a78bfa" />
              <path d="M11 5 L21 12 L11 19 L16 12 Z" fill="#c4b5fd" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
