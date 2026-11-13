"use client";

import { AnimatePresence, motion } from "framer-motion";
import { seededRandom } from "@/lib/random";
import { PARTY_COLORS, type Phase } from "./scene";

const rand = seededRandom(42);
const SHARDS = Array.from({ length: 24 }, (_, id) => {
  const angle = (id / 24) * Math.PI * 2 + rand() * 0.3;
  const distance = 200 + rand() * 240;
  return {
    id,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rotate: rand() * 720 - 360,
    size: 10 + rand() * 18,
    color: id % 3 === 0 ? "#fff1c1" : PARTY_COLORS[id % PARTY_COLORS.length],
  };
});

const RINGS = [
  { color: "#ffd36e", delay: 0 },
  { color: "#a78bfa", delay: 0.2 },
  { color: "#5eead4", delay: 0.4 },
  { color: "#7dd3fc", delay: 0.9 },
  { color: "#c084fc", delay: 1.4 },
];

function Blast() {
  return (
    <div className="absolute">
      <motion.div
        className="absolute size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#ffe9a8_30%,transparent_70%)]"
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {RINGS.map((ring) => (
        <motion.div
          key={ring.color}
          className="absolute size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
          style={{ borderColor: ring.color, boxShadow: `0 0 30px ${ring.color}` }}
          initial={{ scale: 0.2, opacity: 1 }}
          animate={{ scale: 7, opacity: 0 }}
          transition={{ duration: 1.6, delay: ring.delay, ease: "easeOut" }}
        />
      ))}
      {SHARDS.map((shard) => (
        <motion.span
          key={shard.id}
          className="absolute"
          style={{
            width: shard.size,
            height: shard.size,
            marginLeft: -shard.size / 2,
            marginTop: -shard.size / 2,
            background: shard.color,
            boxShadow: `0 0 12px ${shard.color}`,
            clipPath: "polygon(50% 0%, 100% 60%, 30% 100%, 0% 40%)",
          }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{ x: shard.x, y: shard.y, rotate: shard.rotate, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function Moon({ phase }: { phase: Phase }) {
  const visible = phase === "idle" || phase === "ready" || phase === "flying";

  return (
    <div
      className="absolute left-[68%] top-[16%] z-10 sm:left-[74%] sm:top-[21%]"
      aria-hidden
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence initial={false}>
          {visible && (
            <motion.div
              key="moon"
              className="moon relative size-32 rounded-full sm:size-48"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: [1, 1.4, 0.2],
                opacity: [1, 1, 0],
                transition: { duration: 0.5, times: [0, 0.4, 1] },
              }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              <span className="absolute left-[26%] top-[28%] size-[18%] rounded-full bg-[#d9a54a]/35" />
              <span className="absolute left-[55%] top-[50%] size-[24%] rounded-full bg-[#d9a54a]/30" />
              <span className="absolute left-[38%] top-[66%] size-[12%] rounded-full bg-[#d9a54a]/30" />
              <span className="absolute left-[62%] top-[22%] size-[10%] rounded-full bg-[#d9a54a]/25" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {phase === "blast" && <Blast />}
    </div>
  );
}
