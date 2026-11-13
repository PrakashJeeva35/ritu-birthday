"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMusic } from "@/components/music/MusicProvider";
import { site } from "@/content/site";

const GIFT_HREF = "/gift";
const LIGHT_MS = 900;

function GiftIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="10" width="18" height="11" rx="1.5" fill="#7c3aed" />
      <rect x="2" y="7" width="20" height="4" rx="1" fill="#a78bfa" />
      <rect x="11" y="7" width="2" height="14" fill="#ffd36e" />
      <path d="M12 7c-1.5-3-5-4-5.5-1.5C6 7.5 9.5 7.5 12 7zm0 0c1.5-3 5-4 5.5-1.5C18 7.5 14.5 7.5 12 7z" fill="#ffd36e" />
    </svg>
  );
}

export function UnlockGiftButton({ delay }: { delay: number }) {
  const router = useRouter();
  const { stop } = useMusic();
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    router.prefetch(GIFT_HREF);
  }, [router]);

  function open() {
    if (opening) return;
    setOpening(true);
    stop();
    setTimeout(() => router.push(GIFT_HREF), LIGHT_MS);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={open}
        className="btn-gold mt-2 flex items-center gap-3 px-8 py-3.5 text-lg"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, type: "spring", stiffness: 160, damping: 12 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="inline-flex"
          animate={{ rotate: [0, -14, 12, -8, 6, 0] }}
          transition={{ delay: delay + 0.6, duration: 0.8, repeat: Infinity, repeatDelay: 1.6 }}
        >
          <GiftIcon />
        </motion.span>
        {site.unlockGift}
      </motion.button>

      <AnimatePresence>
        {opening && (
          <motion.div
            key="gift-light"
            className="pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(circle_at_50%_70%,#fff8dc_0%,#ffd36e_35%,#a78bfa_80%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: LIGHT_MS / 1000, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
