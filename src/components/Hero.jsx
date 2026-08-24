"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  {
    image: "/brand/hero1.png",
    key: "slide1",
    position: "object-[75%_center] sm:object-center",
  },
  {
    image: "/brand/hero2.png",
    key: "slide2",
    position: "object-[65%_center] sm:object-[60%_center]",
  },
  {
    image: "/brand/hero3.png",
    key: "slide3",
    position: "object-[65%_center] sm:object-[60%_center]",
  },
];

const SLIDE_DURATION = 5000;

// Persistent trust points — same content shown regardless of which slide is active
const trustPoints = [
  {
    key: "purity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
        <path
          d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 12.5l2 2 4-4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "research",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
        <path
          d="M10 3h4M12 3v6l-4.5 8a2 2 0 001.7 3h9.6a2 2 0 001.7-3L16 9V3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "coa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
        <path
          d="M7 3h7l4 4v14H7V3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path
          d="M9.5 14.5l1.5 1.5 3-3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "quality",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
        <path
          d="M9 3h6M10 3v5.5L5.5 17a1.8 1.8 0 001.6 2.6h9.8a1.8 1.8 0 001.6-2.6L14 8.5V3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.5 15h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[85vh] sm:h-[85vh] md:h-[95vh] overflow-hidden"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[index].image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={slides[index].image}
            alt="Healix Pharma Tesamoreline vial and box"
            fill
            priority
            className={`object-cover ${slides[index].position}`}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute top-36 sm:top-44 md:top-52 left-0 right-0 sm:left-20 sm:right-auto text-center sm:text-left px-4 sm:px-0 sm:max-w-lg"
      >
        <h2 className="w-full text-7xl sm:text-7xl md:text-9xl font-black text-white tracking-tight leading-[0.95] drop-shadow-lg">
          HEALIX
        </h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={slides[index].key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-2 sm:mt-5 text-sm sm:text-xl md:text-2xl font-light text-white/90 tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-md"
          >
            {t(`hero.slides.${slides[index].key}`)}
          </motion.p>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-3 sm:mt-5 text-white/80 text-xs sm:text-base leading-relaxed px-6 sm:px-0 max-w-xs sm:max-w-sm mx-auto sm:mx-0"
        >
          {t("hero.description")}
        </motion.p>

        {/* Persistent 4-point trust block — same on every slide, glass style to match existing UI */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
          className="mt-3 sm:mt-5 grid grid-cols-2 gap-1.5 sm:gap-2.5 px-4 sm:px-0 max-w-xs sm:max-w-sm mx-auto sm:mx-0"
        >
          {trustPoints.map((point) => (
            <div
              key={point.key}
              className="flex flex-col items-start gap-0.5 sm:gap-1 rounded-lg bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg px-2 py-1.5 sm:px-2.5 sm:py-2 text-left"
            >
              <span className="text-white">{point.icon}</span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-white leading-tight whitespace-nowrap">
                {t(`hero.trust.${point.key}.title`)}
              </span>
              <span className="hidden sm:block text-[10px] text-white/70 leading-snug">
                {t(`hero.trust.${point.key}.desc`)}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="md:hidden absolute bottom-4 left-4 right-4 text-left px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-widest text-white/90 mb-1">
          {t("hero.brandLabel")}
        </p>
        <h1 className="text-xs font-medium leading-snug text-white">
          {t("hero.tagline")}
        </h1>
        <button className="mt-3 px-4 py-1.5 bg-white text-gray-900 text-xs font-medium rounded-full hover:bg-gray-100 transition cursor-pointer">
          {t("hero.verifyButton")}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="hidden md:block absolute bottom-16 right-10 max-w-sm text-left px-6 py-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs uppercase tracking-widest text-white/90 mb-2"
        >
          {t("hero.brandLabel")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-2xl md:text-3xl font-bold leading-snug text-white"
        >
          {t("hero.tagline")}
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onClick={() => {
            document.getElementById("verify")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="mt-4 px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          {t("hero.verifyButton")}
        </motion.button>
      </motion.div>
    </section>
  );
}