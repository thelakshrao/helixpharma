"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[110vh] sm:h-[85vh] md:h-[116vh] overflow-hidden">
      <Image
        src="/brand/hero.png"
        alt="Hero background"
        fill
        priority
        className="object-cover object-top -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-10 sm:right-auto sm:max-w-xs md:max-w-sm md:bottom-30 text-left px-4 py-3 sm:px-6 sm:py-5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/50 sm:border-white/90 shadow-2xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[10px] sm:text-xs uppercase tracking-widest text-white/90 mb-1 sm:mb-2"
        >
          — HEALIX
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="md:hidden text-base sm:text-lg font-semibold leading-snug text-white"
        >
          Building champions on and off the court.
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="hidden md:block text-2xl lg:text-3xl font-bold leading-snug text-white"
        >
          Building champions on and off the court with advanced Healix technology designed to push your limits every single day.
        </motion.h1>
      </motion.div>
    </section>
  );
}