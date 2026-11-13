"use client";

import { motion } from "framer-motion";

/** Continues the golden light transition used when leaving the previous screen. */
export function LightFadeIn() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(circle_at_50%_55%,#fff8dc_0%,#ffd36e_35%,#a78bfa_85%)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
}
