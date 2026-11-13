"use client";

import { motion } from "framer-motion";
import { seededRandom } from "@/lib/random";
import {
  Confetti,
  Dust,
  Fireworks,
  GOLD,
  RisingHearts,
  Sunlight,
  Twinkles,
  WarmGlow,
  particles,
} from "@/components/film/effects";

const DUST = particles(11, 22, { x: [0, 65], y: [10, 90] });
const SPARKS = particles(23, 26, { x: [5, 95], y: [30, 95] });
const TWINKLES = particles(37, 22, { x: [55, 99], y: [2, 34] });
const TWINKLES_LEFT = particles(61, 18, { x: [1, 40], y: [2, 30] });

const BOKEH = (() => {
  const rand = seededRandom(53);
  const colors = ["#ffd36e", "#fbbf24", "#fff7d6", "#c4b5fd", "#a78bfa"];
  return Array.from({ length: 12 }, (_, i) => ({
    y: 12 + rand() * 45,
    size: 14 + rand() * 30,
    delay: rand() * 3,
    duration: 1.6 + rand() * 1.6,
    color: colors[i % colors.length],
  }));
})();

export function ShotEffects({ id }: { id: string }) {
  switch (id) {
    case "1-arrival":
    case "3-delegate":
      return (
        <>
          <Sunlight at="12% 18%" />
          <Dust items={DUST} color="#fff3d6" />
        </>
      );
    case "2-meeting":
      return <Dust items={DUST} color="#ffffff" />;
    case "4-celebrate":
      return (
        <>
          <Sunlight at="18% 22%" />
          <Confetti />
        </>
      );
    case "5-car":
      return (
        <>
          <Sunlight at="6% 58%" strong />
          <LensFlare />
        </>
      );
    case "6-drive":
      return <DriveLights />;
    case "7-home":
      return (
        <>
          <Twinkles items={TWINKLES} />
          <Fireworks />
        </>
      );
    case "8-door":
      return (
        <>
          <WarmGlow at="72% 45%" rgb="255,190,110" strength={0.55} size={55} duration={3} />
          <Dust items={SPARKS} color={GOLD} glow />
        </>
      );
    case "9-together":
      return (
        <>
          <Twinkles items={TWINKLES_LEFT} />
          <WarmGlow at="45% 40%" strength={0.35} />
          <Dust items={SPARKS} color={GOLD} glow />
          <RisingHearts />
        </>
      );
    default:
      return null;
  }
}

function LensFlare() {
  return (
    <>
      <motion.div
        className="absolute left-[6%] top-[58%] h-1 w-[70%] -translate-y-1/2 rounded-full mix-blend-screen"
        style={{ background: "linear-gradient(90deg, rgba(255,214,140,0.9), rgba(255,214,140,0))" }}
        animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.9, 1.05, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      {[
        { left: "28%", top: "48%", size: 40, color: "rgba(255,214,140,0.25)" },
        { left: "44%", top: "40%", size: 22, color: "rgba(196,181,253,0.3)" },
        { left: "58%", top: "33%", size: 60, color: "rgba(255,214,140,0.12)" },
      ].map((f, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full mix-blend-screen"
          style={{ left: f.left, top: f.top, width: f.size, height: f.size, background: f.color }}
          animate={{ opacity: [0.4, 1, 0.4], x: [0, 10, 0] }}
          transition={{ duration: 4, delay: i * 0.4, repeat: Infinity }}
        />
      ))}
    </>
  );
}

function DriveLights() {
  return (
    <>
      <motion.div
        className="absolute inset-y-0 w-[45%] mix-blend-screen"
        style={{
          background:
            "linear-gradient(100deg, transparent, rgba(255,200,120,0.28) 45%, rgba(255,230,180,0.35) 50%, rgba(255,200,120,0.28) 55%, transparent)",
        }}
        initial={{ left: "-50%" }}
        animate={{ left: ["-50%", "110%"] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
      />
      {BOKEH.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full mix-blend-screen blur-[3px]"
          style={{ top: `${b.y}%`, width: b.size, height: b.size, background: b.color }}
          initial={{ left: "56%", opacity: 0 }}
          animate={{ left: ["56%", "102%"], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </>
  );
}
