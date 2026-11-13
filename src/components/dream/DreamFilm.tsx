"use client";

import { Film, type Camera } from "@/components/film/Film";
import { dream } from "@/content/dream";
import { ShotEffects } from "./ShotEffects";

const CAMERA: Record<string, Camera> = {
  "1-arrival": { origin: "50% 28%", from: 1.02, to: 1.14 },
  "2-meeting": { origin: "55% 35%", from: 1.1, to: 1.1, pan: [2.5, -2.5] },
  "3-delegate": { origin: "62% 35%", from: 1.0, to: 1.12 },
  "4-celebrate": { origin: "48% 40%", from: 1.16, to: 1.02 },
  "5-car": { origin: "40% 35%", from: 1.08, to: 1.12, pan: [3, -2] },
  "6-drive": { origin: "42% 40%", from: 1.04, to: 1.13, shake: true },
  "7-home": { origin: "50% 45%", from: 1.18, to: 1.02 },
  "8-door": { origin: "50% 32%", from: 1.0, to: 1.16 },
  "9-together": { origin: "48% 38%", from: 1.14, to: 1.0 },
};

export function DreamFilm() {
  return <Film film={dream} camera={CAMERA} Effects={ShotEffects} />;
}
