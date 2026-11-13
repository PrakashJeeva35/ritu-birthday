"use client";

import { motion } from "framer-motion";
import { seededRandom } from "@/lib/random";

export const GOLD = "#ffd36e";
const CONFETTI_COLORS = ["#a78bfa", "#ffd36e", "#5eead4", "#7dd3fc", "#c084fc", "#818cf8"];

export type Particle = { x: number; y: number; size: number; delay: number; duration: number; drift: number };

export function particles(seed: number, count: number, area: { x: [number, number]; y: [number, number] }): Particle[] {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, () => ({
    x: area.x[0] + rand() * (area.x[1] - area.x[0]),
    y: area.y[0] + rand() * (area.y[1] - area.y[0]),
    size: 2 + rand() * 3,
    delay: rand() * 5,
    duration: 5 + rand() * 5,
    drift: (rand() - 0.5) * 30,
  }));
}

const HEARTS = particles(73, 10, { x: [8, 92], y: [55, 95] });
const HEART_COLORS = ["#c084fc", "#a78bfa", "#ffd36e", "#8b5cf6"];

const CONFETTI = (() => {
  const rand = seededRandom(41);
  return Array.from({ length: 28 }, () => ({
    x: rand() * 100,
    delay: rand() * 4,
    duration: 3.5 + rand() * 3,
    spin: 360 + rand() * 540,
    sway: (rand() - 0.5) * 60,
    w: 5 + rand() * 5,
  }));
})();

const BURSTS = [
  { x: 128, y: 18, color: GOLD, delay: 0.4 },
  { x: 146, y: 30, color: "#c084fc", delay: 1.3 },
  { x: 110, y: 12, color: "#5eead4", delay: 2.1 },
];
const RAYS = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);

/** A soft pulsing light, blended over the image. `rgb` is "r,g,b". */
export function WarmGlow({
  at,
  rgb = "255,200,130",
  strength = 0.4,
  size = 60,
  duration = 3.5,
  flicker = false,
}: {
  at: string;
  rgb?: string;
  strength?: number;
  size?: number;
  duration?: number;
  flicker?: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-0 mix-blend-screen"
      style={{ background: `radial-gradient(ellipse at ${at}, rgba(${rgb},${strength}), transparent ${size}%)` }}
      animate={{ opacity: flicker ? [0.75, 1, 0.8, 0.95, 0.7, 1, 0.85] : [0.45, 0.9, 0.45] }}
      transition={{ duration: flicker ? 1.4 : duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function Sunlight({ at, strong = false }: { at: string; strong?: boolean }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background: `radial-gradient(ellipse at ${at}, rgba(255,205,130,${strong ? 0.75 : 0.5}), transparent 60%)`,
        }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -inset-[20%] mix-blend-screen"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0 60px, rgba(255,226,170,0.07) 60px 110px)",
          maskImage: `radial-gradient(ellipse at ${at}, black, transparent 65%)`,
          WebkitMaskImage: `radial-gradient(ellipse at ${at}, black, transparent 65%)`,
        }}
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export function Dust({ items, color, glow = false }: { items: Particle[]; color: string; glow?: boolean }) {
  return (
    <>
      {items.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: glow ? `0 0 ${p.size * 3}px ${color}` : `0 0 ${p.size}px ${color}`,
          }}
          initial={{ opacity: 0 }}
          animate={{ y: [0, -50], x: [0, p.drift], opacity: [0, glow ? 1 : 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

export function Confetti({ colors = CONFETTI_COLORS }: { colors?: string[] }) {
  return (
    <>
      {CONFETTI.map((c, i) => (
        <motion.span
          key={i}
          className="absolute rounded-[1px]"
          style={{ left: `${c.x}%`, width: c.w, height: c.w * 1.6, background: colors[i % colors.length] }}
          initial={{ top: "-6%", opacity: 0 }}
          animate={{ top: ["-6%", "106%"], x: [0, c.sway, 0], rotate: [0, c.spin], opacity: [0, 1, 1] }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </>
  );
}

export function RisingHearts() {
  return (
    <>
      {HEARTS.map((h, i) => (
        <motion.svg
          key={i}
          className="absolute"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            filter: `drop-shadow(0 0 6px ${HEART_COLORS[i % HEART_COLORS.length]})`,
          }}
          width={12 + h.size * 4}
          height={12 + h.size * 4}
          viewBox="0 0 24 24"
          initial={{ opacity: 0 }}
          animate={{ y: [0, -90], x: [0, h.drift], opacity: [0, 0.9, 0], scale: [0.7, 1.1] }}
          transition={{ duration: h.duration + 1, delay: h.delay, repeat: Infinity, ease: "easeOut" }}
        >
          <path
            d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.5 1.2 4.3 2.4.8-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
            fill={HEART_COLORS[i % HEART_COLORS.length]}
          />
        </motion.svg>
      ))}
    </>
  );
}

export function Twinkles({ items }: { items: Particle[] }) {
  return (
    <>
      {items.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#fff7d6]"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, boxShadow: "0 0 6px #fff7d6" }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 1.6 + (i % 4) * 0.5, delay: s.delay % 2, repeat: Infinity }}
        />
      ))}
    </>
  );
}

export function Fireworks() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {BURSTS.map((b, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1.15], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, delay: b.delay, repeat: Infinity, repeatDelay: 1.2 }}
        >
          {RAYS.map((a, j) => (
            <g key={j}>
              <line
                x1={b.x + Math.cos(a) * 2}
                y1={b.y + Math.sin(a) * 2}
                x2={b.x + Math.cos(a) * 7}
                y2={b.y + Math.sin(a) * 7}
                stroke={b.color}
                strokeWidth="0.6"
                strokeLinecap="round"
              />
              <circle cx={b.x + Math.cos(a) * 8.2} cy={b.y + Math.sin(a) * 8.2} r="0.5" fill="#fff7d6" />
            </g>
          ))}
        </motion.g>
      ))}
    </svg>
  );
}
