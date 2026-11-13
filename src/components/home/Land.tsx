import { seededRandom } from "@/lib/random";
import { PARTY_COLORS } from "./scene";

const rand = seededRandom(21);
const FIREFLIES = Array.from({ length: 22 }, (_, id) => ({
  id,
  left: rand() * 100,
  bottom: 2 + rand() * 16,
  delay: rand() * 3,
  color: PARTY_COLORS[id % PARTY_COLORS.length],
}));

export function Land() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[30vh]" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d43b3" />
            <stop offset="100%" stopColor="#2a1460" />
          </linearGradient>
          <linearGradient id="hill-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#21104f" />
            <stop offset="100%" stopColor="#08041c" />
          </linearGradient>
        </defs>
        <path
          d="M0 140 C 180 60, 360 60, 520 120 S 860 40, 1040 110 S 1320 70, 1440 120 L1440 320 L0 320 Z"
          fill="url(#hill-back)"
          opacity="0.9"
        />
        <path
          d="M0 210 C 200 150, 420 170, 600 140 C 680 128, 760 128, 840 140 C 1040 170, 1240 150, 1440 200 L1440 320 L0 320 Z"
          fill="url(#hill-front)"
        />
      </svg>

      {FIREFLIES.map((f) => (
        <span
          key={f.id}
          className="star absolute size-1.5 rounded-full"
          style={{
            left: `${f.left}%`,
            bottom: `${f.bottom}%`,
            background: f.color,
            boxShadow: `0 0 10px 2px ${f.color}`,
            animationDelay: `${f.delay}s`,
            animationDuration: "2.6s",
          }}
        />
      ))}
    </div>
  );
}
