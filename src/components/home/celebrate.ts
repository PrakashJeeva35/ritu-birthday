import confetti from "canvas-confetti";
import { PARTY_COLORS, type Point } from "./scene";

const base: confetti.Options = {
  colors: PARTY_COLORS,
  disableForReducedMotion: true,
  zIndex: 35,
};

export function launchSparks(origin: Point) {
  confetti({
    ...base,
    origin,
    particleCount: 40,
    angle: 80,
    spread: 50,
    startVelocity: 22,
    scalar: 0.7,
    ticks: 90,
  });
}

export function moonBlast(origin: Point) {
  confetti({
    ...base,
    origin,
    particleCount: 180,
    spread: 360,
    startVelocity: 45,
    shapes: ["star"],
    scalar: 1.2,
    ticks: 220,
  });
  confetti({
    ...base,
    origin,
    particleCount: 120,
    spread: 360,
    startVelocity: 28,
    shapes: ["circle"],
    ticks: 200,
  });
}

export function sideCannons() {
  confetti({
    ...base,
    origin: { x: 0, y: 0.9 },
    angle: 60,
    spread: 70,
    particleCount: 120,
    startVelocity: 60,
  });
  confetti({
    ...base,
    origin: { x: 1, y: 0.9 },
    angle: 120,
    spread: 70,
    particleCount: 120,
    startVelocity: 60,
  });
}

export function randomFirework() {
  confetti({
    ...base,
    origin: { x: 0.15 + Math.random() * 0.7, y: 0.1 + Math.random() * 0.3 },
    particleCount: 70,
    spread: 360,
    startVelocity: 24,
    gravity: 0.8,
    ticks: 130,
    shapes: Math.random() > 0.5 ? ["star"] : ["circle"],
  });
}
