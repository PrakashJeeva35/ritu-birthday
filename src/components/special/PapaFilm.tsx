"use client";

import { Film, type Camera } from "@/components/film/Film";
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
import { papaFilm } from "@/content/special";

const CAMERA: Record<string, Camera> = {
  "1-hello": { origin: "50% 32%", from: 1.0, to: 1.14 },
  "2-wave": { origin: "45% 40%", from: 1.04, to: 1.14 },
  "3-cake": { origin: "52% 55%", from: 1.14, to: 1.02 },
  "4-heart": { origin: "42% 45%", from: 1.0, to: 1.12 },
  "5-blessing": { origin: "42% 40%", from: 1.02, to: 1.12, pan: [-1.5, 1.5] },
  "6-papa": { origin: "50% 30%", from: 1.0, to: 1.08 },
  "7-gift-box": { origin: "62% 45%", from: 1.0, to: 1.14 },
  "8-surprise": { origin: "58% 35%", from: 1.16, to: 1.02, shake: true },
  "9-no-returns": { origin: "32% 60%", from: 1.02, to: 1.14 },
};

const LIGHTS = [
  ...particles(81, 10, { x: [1, 20], y: [2, 45] }),
  ...particles(82, 10, { x: [80, 99], y: [2, 45] }),
  ...particles(83, 8, { x: [20, 80], y: [0, 6] }),
];
const CANDLE_SPARKS = particles(91, 14, { x: [40, 64], y: [58, 70] });
const SPARKS = particles(23, 26, { x: [5, 95], y: [30, 95] });
const GOLD_CONFETTI = ["#ffd36e", "#fbbf24", "#fff7d6", "#c084fc", "#a78bfa"];

function PapaEffects({ id }: { id: string }) {
  switch (id) {
    case "1-hello":
    case "2-wave":
      return (
        <>
          <WarmGlow at="50% 8%" strength={0.3} size={45} />
          <Twinkles items={LIGHTS} />
        </>
      );
    case "3-cake":
      return (
        <>
          <WarmGlow at="52% 68%" rgb="255,170,80" strength={0.55} size={38} flicker />
          <Dust items={CANDLE_SPARKS} color={GOLD} glow />
        </>
      );
    case "4-heart":
      return (
        <>
          <WarmGlow at="46% 80%" strength={0.4} size={40} duration={3} />
          <Dust items={SPARKS} color={GOLD} glow />
        </>
      );
    case "5-blessing":
      return (
        <>
          <Sunlight at="28% 40%" />
          <Dust items={SPARKS} color={GOLD} glow />
        </>
      );
    case "6-papa":
      return (
        <>
          <WarmGlow at="50% 45%" strength={0.3} size={50} />
          <Fireworks />
          <Dust items={SPARKS} color={GOLD} glow />
          <RisingHearts />
        </>
      );
    case "7-gift-box":
      return (
        <>
          <Twinkles items={LIGHTS} />
          <WarmGlow at="72% 35%" rgb="255,211,110" strength={0.35} size={35} duration={1.6} />
        </>
      );
    case "8-surprise":
      return <Confetti colors={GOLD_CONFETTI} />;
    case "9-no-returns":
      return (
        <>
          <Twinkles items={LIGHTS} />
          <RisingHearts />
        </>
      );
    default:
      return null;
  }
}

export function PapaFilm() {
  return <Film film={papaFilm} camera={CAMERA} Effects={PapaEffects} />;
}
