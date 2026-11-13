"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site, type Photo } from "@/content/site";
import { UnlockGiftButton } from "./UnlockGiftButton";

const TITLE_WORDS = ["Happy", "Birthday"];

function Title() {
  return (
    <h1 className="flex flex-col items-center text-center" aria-label={`Happy Birthday ${site.name}`}>
      <motion.span
        className="eyebrow mb-3 block text-[0.65rem] sm:text-xs"
        initial={{ opacity: 0, letterSpacing: "0.6em" }}
        animate={{ opacity: 1, letterSpacing: "0.32em" }}
        transition={{ duration: 1.4, delay: 0.2 }}
        aria-hidden
      >
        {site.titleEyebrow}
      </motion.span>
      <span
        className="flex flex-wrap justify-center gap-x-3 font-display text-[3.4rem] font-semibold leading-none drop-shadow-[0_0_24px_rgba(255,211,110,0.45)] sm:gap-x-5 sm:text-8xl"
        aria-hidden
      >
        {TITLE_WORDS.map((word, w) => (
          <span key={word} className="inline-flex">
            {word.split("").map((char, c) => {
              const i = TITLE_WORDS.slice(0, w).join("").length + c;
              return (
                <span
                  key={i}
                  className="letter-wave"
                  style={{ animationDelay: `${1 + i * 0.1}s` }}
                >
                  <motion.span
                    className="gold-text inline-block"
                    style={{ animationDelay: `${i * 0.12}s` }}
                    initial={{ y: -120, opacity: 0, rotate: -20, scale: 0.4 }}
                    animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 15, delay: i * 0.06 }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
      <motion.span
        className="ritu-text -mt-1 block px-6 py-2 font-script text-[6.5rem] leading-tight sm:-mt-3 sm:text-[10rem]"
        initial={{ scale: 0, rotate: -12, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 10, delay: 0.9 }}
        aria-hidden
      >
        {site.name}
      </motion.span>
    </h1>
  );
}

function Polaroid({
  photo,
  className,
  tilt,
  from,
  delay,
  featured = false,
}: {
  photo: Photo;
  className: string;
  tilt: number;
  from: { x?: number; y?: number };
  delay: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.3, rotate: tilt * 4, ...from }}
      animate={{ opacity: 1, scale: 1, rotate: tilt, x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 12, delay }}
      whileHover={{ scale: 1.07, rotate: 0, zIndex: 20 }}
    >
      <div className="float-y" style={{ animationDelay: `${delay}s` }}>
        {featured && <div className="rainbow-ring absolute -inset-2 rounded-xl blur-[3px]" />}
        <div className="relative rounded-md bg-white p-2 pb-8 shadow-[0_20px_50px_rgba(20,0,60,0.55)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 640px) 18rem, 10rem"
            loading="eager"
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />
          <svg
            className="absolute bottom-2 left-1/2 -translate-x-1/2"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.5 1.2 4.3 2.4.8-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
              fill="#8b5cf6"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function Reveal() {
  const { left, center, right } = site.homePhotos;

  return (
    <section className="relative z-40 flex min-h-dvh flex-col items-center justify-center gap-4 px-4 py-12">
      <Title />

      <div className="mt-2 flex items-center justify-center">
        <Polaroid
          photo={left}
          className="-mr-4 w-28 sm:-mr-6 sm:w-44 lg:w-52"
          tilt={-10}
          from={{ x: -320 }}
          delay={1.4}
        />
        <Polaroid
          photo={center}
          className="z-10 w-40 sm:w-60 lg:w-72"
          tilt={0}
          from={{ y: 320 }}
          delay={1.6}
          featured
        />
        <Polaroid
          photo={right}
          className="-ml-4 w-28 sm:-ml-6 sm:w-44 lg:w-52"
          tilt={10}
          from={{ x: 320 }}
          delay={1.8}
        />
      </div>

      <motion.p
        className="mt-4 font-script text-3xl text-[#fff1c1] drop-shadow-[0_0_14px_rgba(255,211,110,0.55)] sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8 }}
      >
        {site.homeMessage}
      </motion.p>

      <UnlockGiftButton delay={3.4} />
    </section>
  );
}
