export type Phase = "idle" | "ready" | "flying" | "blast" | "reveal";

export type Point = { x: number; y: number };

const DESKTOP_MIN_WIDTH = 640;

// Must match the moon's Tailwind position classes in Moon.tsx (sm = 640px).
export function moonPosition(viewportWidth: number): Point {
  return viewportWidth >= DESKTOP_MIN_WIDTH ? { x: 0.74, y: 0.21 } : { x: 0.68, y: 0.16 };
}

/** Length of the arrow drawing in Arrow.tsx at scale 1, tail to tip. */
export const ARROW_LENGTH = 84;
export const ARROW_HEIGHT = 24;

/** Archer.tsx draws in a local space where the bow shoulder is (0, 0) and the feet are 82 units below. */
const SHOULDER_ABOVE_FEET = 82;
const SHOULDER_RIGHT_OF_FEET = 6;
const STRING_DRAW_X = 2;

export type Aim = {
  scale: number;
  shoulder: Point;
  /** Where the arrow tip rests while nocked; the flight starts here. */
  tip: Point;
  moon: Point;
  angle: number;
};

export function aimAtMoon(width: number, height: number): Aim {
  const desktop = width >= DESKTOP_MIN_WIDTH;
  const feet = desktop ? { x: 0.3 * width, y: 0.87 * height } : { x: 0.26 * width, y: 0.87 * height };
  const scale = desktop ? 1.5 : 1.05;
  const shoulder = {
    x: feet.x + SHOULDER_RIGHT_OF_FEET * scale,
    y: feet.y - SHOULDER_ABOVE_FEET * scale,
  };
  const moonFraction = moonPosition(width);
  const moon = { x: moonFraction.x * width, y: moonFraction.y * height };
  const radians = Math.atan2(moon.y - shoulder.y, moon.x - shoulder.x);
  const reach = (ARROW_LENGTH + STRING_DRAW_X) * scale;
  return {
    scale,
    shoulder,
    tip: {
      x: shoulder.x + Math.cos(radians) * reach,
      y: shoulder.y + Math.sin(radians) * reach,
    },
    moon,
    angle: (radians * 180) / Math.PI,
  };
}

// Tap to reveal takes READY_MS + FLIGHT_MS + BLAST_MS = 10 seconds.
export const READY_MS = 2500;
export const FLIGHT_MS = 4500;
export const BLAST_MS = 3000;

export const PARTY_COLORS = [
  "#a78bfa",
  "#ffd36e",
  "#5eead4",
  "#7dd3fc",
  "#c084fc",
  "#818cf8",
];
