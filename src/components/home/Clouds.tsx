"use client";

import { motion } from "framer-motion";
import { FLIGHT_MS, type Point } from "./scene";

type CloudSpec = {
  id: number;
  x: number;
  y: number;
  width: number;
  front: boolean;
  drift: number;
  tint: string;
};

const CLOUDS: CloudSpec[] = [
  { id: 0, x: 0.18, y: 0.38, width: 240, front: false, drift: 18, tint: "#e6dcff" },
  { id: 1, x: 0.6, y: 0.36, width: 270, front: true, drift: 22, tint: "#dfe7ff" },
  { id: 2, x: 0.45, y: 0.52, width: 320, front: true, drift: 26, tint: "#e4dcff" },
  { id: 3, x: 0.86, y: 0.46, width: 220, front: false, drift: 20, tint: "#d9e4ff" },
  { id: 4, x: 0.1, y: 0.6, width: 200, front: false, drift: 24, tint: "#dcd0ff" },
  { id: 5, x: 0.62, y: 0.65, width: 260, front: true, drift: 28, tint: "#ece4ff" },
];

function CloudShape({ gradientId, tint }: { gradientId: string; tint: string }) {
  return (
    <svg
      viewBox="0 0 200 90"
      className="h-auto w-full drop-shadow-[0_0_25px_rgba(196,181,253,0.4)]"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={tint} />
        </linearGradient>
      </defs>
      <path
        d="M40 80 Q10 80 12 60 Q14 42 36 44 Q38 20 66 22 Q80 4 106 14 Q128 2 146 24 Q176 22 180 48 Q198 54 192 70 Q188 82 168 80 Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function Clouds({
  layer,
  flying,
  dimmed,
  launch,
  moon,
}: {
  layer: "back" | "front";
  flying: boolean;
  dimmed: boolean;
  /** Arrow start and target, as fractions of the viewport. */
  launch: Point;
  moon: Point;
}) {
  const clouds = CLOUDS.filter((c) => c.front === (layer === "front"));
  const opacity = dimmed ? 0.3 : 0.85;

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${layer === "front" ? "z-30" : "z-10"}`}
      aria-hidden
    >
      {clouds.map((cloud) => {
        const progress = clamp01((launch.y - cloud.y) / (launch.y - moon.y));
        const pathX = launch.x + progress * (moon.x - launch.x);
        const offset = cloud.x - pathX;
        const push = Math.sign(offset || 1) * Math.max(0, 0.35 - Math.abs(offset)) * 280;
        // The arrow eases in, so it reaches a given height at roughly sqrt(progress) of the flight.
        const reachedAt = Math.max(0, Math.sqrt(progress) * (FLIGHT_MS / 1000) - 0.4);

        return (
          <div
            key={cloud.id}
            className="cloud-drift absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${cloud.x * 100}%`,
              top: `${cloud.y * 100}%`,
              width: `min(${cloud.width}px, ${cloud.width / 6}vw)`,
              animationDuration: `${cloud.drift}s`,
            }}
          >
            <motion.div
              initial={false}
              animate={
                flying
                  ? { x: [0, push, push * 0.5], scale: [1, 1.15, 1], opacity: [opacity, 0.5, opacity] }
                  : { x: 0, scale: 1, opacity }
              }
              transition={flying ? { duration: 1.8, delay: reachedAt } : { duration: 1.2 }}
            >
              <CloudShape gradientId={`cloud-${layer}-${cloud.id}`} tint={cloud.tint} />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
