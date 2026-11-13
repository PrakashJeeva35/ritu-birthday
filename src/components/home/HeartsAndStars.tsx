import type { CSSProperties } from "react";
import { seededRandom } from "@/lib/random";

const HEART_COLORS = ["#a78bfa", "#c084fc", "#8b5cf6", "#818cf8", "#ffd36e"];
const STAR_COLORS = ["#ffd36e", "#fde68a", "#5eead4", "#7dd3fc", "#c4b5fd"];

const HEART_PATH =
  "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.5 1.2 4.3 2.4.8-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z";
const STAR_PATH =
  "M12 1.8l2.9 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.3 5.7 21l1.6-7.1L1.9 9.1l7.2-.7z";

type Floater = {
  id: number;
  kind: "heart" | "star";
  left: number;
  size: number;
  color: string;
  delay: number;
  rise: number;
  sway: number;
  swayTime: number;
  spin: number;
};

const rand = seededRandom(99);
const FLOATERS: Floater[] = Array.from({ length: 24 }, (_, id) => {
  const kind = id % 2 === 0 ? "heart" : "star";
  const colors = kind === "heart" ? HEART_COLORS : STAR_COLORS;
  return {
    id,
    kind,
    left: 2 + rand() * 94,
    size: 30 + rand() * 36,
    color: colors[Math.floor(rand() * colors.length)],
    delay: rand() * 10,
    rise: 9 + rand() * 7,
    sway: 14 + rand() * 26,
    swayTime: 2.4 + rand() * 1.8,
    spin: (6 + rand() * 6) * (rand() > 0.5 ? 1 : -1),
  };
});

export function HeartsAndStars() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {FLOATERS.map((f) => (
        <span
          key={f.id}
          className="float-rise"
          style={{
            left: `${f.left}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.rise}s`,
          }}
        >
          <span
            className="float-sway"
            style={{ "--sway": `${f.sway}px`, animationDuration: `${f.swayTime}s` } as CSSProperties}
          >
            <svg
              className={f.kind === "heart" ? "heart-beat" : "star-spin"}
              width={f.size}
              height={f.size}
              viewBox="0 0 24 24"
              style={{
                filter: `drop-shadow(0 0 8px ${f.color})`,
                animationDuration: f.kind === "star" ? `${Math.abs(f.spin)}s` : undefined,
                animationDirection: f.spin < 0 ? "reverse" : undefined,
              }}
            >
              {f.kind === "heart" ? <Heart color={f.color} /> : <Star color={f.color} />}
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}

function Heart({ color }: { color: string }) {
  return (
    <>
      <path d={HEART_PATH} fill={color} />
      <path d="M5 8.2c.6-1.6 2-2.4 3.4-2.1" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="4.9" cy="10.4" r="0.9" fill="#ffffff" fillOpacity="0.7" />
    </>
  );
}

function Star({ color }: { color: string }) {
  return (
    <>
      <path d={STAR_PATH} fill={color} stroke="#fff7d6" strokeOpacity="0.6" strokeWidth="0.8" strokeLinejoin="round" />
      <path d="M12 6.5l1.4 3.2 3.5.3-2.6 2.3.8 3.4L12 13.9l-3.1 1.8.8-3.4-2.6-2.3 3.5-.3z" fill="#ffffff" fillOpacity="0.35" />
    </>
  );
}
