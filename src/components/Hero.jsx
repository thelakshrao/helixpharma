"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/brand/hero1.png",
    slogan: "Push Beyond Limits",
    position: "object-[75%_center] sm:object-center",
  },
  {
    image: "/brand/hero2.png",
    slogan: "Engineered To Perform",
    position: "object-[65%_center] sm:object-[60%_center]",
  },
  {
    image: "/brand/hero3.png",
    slogan: "Purity You Can Trust",
    position: "object-[65%_center] sm:object-[60%_center]",
  },
];

const SLIDE_DURATION = 15000;

export default function Hero() {
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
    <section className="relative w-full h-[85vh] sm:h-[85vh] md:h-[95vh] overflow-hidden">
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

      <div className="absolute inset-0 bg-black/20 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute top-52 sm:top-44 md:top-52 left-0 right-0 sm:left-20 sm:right-auto text-center sm:text-left px-4 sm:px-0 sm:max-w-lg"
      >
        <h2 className="w-full text-8xl sm:text-7xl md:text-9xl font-black text-white tracking-tight leading-[0.95] drop-shadow-lg">
          HEALIX
        </h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={slides[index].slogan}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-3 sm:mt-5 text-sm sm:text-xl md:text-2xl font-light text-white/90 tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-md"
          >
            {slides[index].slogan}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="md:hidden absolute bottom-4 left-4 right-4 text-left px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-widest text-white/90 mb-1">
          — HEALIX PHARMA
        </p>
        <h1 className="text-xs font-medium leading-snug text-white">
          Engineered for peak performance. Trusted by athletes who push their
          limits every single day.
        </h1>
        <button className="mt-3 px-4 py-1.5 bg-white text-gray-900 text-xs font-medium rounded-full hover:bg-gray-100 transition">
          Verify Authenticity
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
          — HEALIX PHARMA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-2xl md:text-3xl font-bold leading-snug text-white"
        >
          Engineered for peak performance. Trusted by athletes who push their
          limits every single day.
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition"
        >
          Verify Authenticity
        </motion.button>
      </motion.div>
    </section>
  );
}
