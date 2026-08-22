"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell, Zap, TrendingUp, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Muscle recovery",
    desc: "Supports faster recovery between intense training sessions.",
  },
  {
    icon: Zap,
    title: "Peak energy",
    desc: "Formulated to help sustain energy through heavy lifting cycles.",
  },
  {
    icon: TrendingUp,
    title: "Lean growth",
    desc: "Backed by research to support quality muscle development.",
  },
  {
    icon: ShieldCheck,
    title: "Lab verified",
    desc: "Every batch tested for purity above 99% before it reaches you.",
  },
];

export default function Bodybuilding() {
  return (
    <section className="relative w-full bg-[#f8fafc] py-16 sm:py-20 md:py-28 px-6 sm:px-10 md:px-16 overflow-hidden">
      <div className="absolute left-10 sm:left-50 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 opacity-20 blur-[1px] rotate-15 z-0 pointer-events-none hidden md:block">
        <Image
          src="/brand/product.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-blue-400" />
            <p className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-semibold">
              Built for the grind
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-5">
            Fuel your training, back your goals.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-8">
            Whether you're deep into a cutting cycle or chasing serious mass, Healix Pharma products are formulated for athletes and bodybuilders who demand purity, consistency, and results they can measure.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 mb-3">
                    <Icon className="text-blue-500" size={17} />
                  </div>
                  <h3 className="text-slate-900 text-sm font-semibold mb-1">{b.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

          <Link
            href="/product"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-400 text-white text-sm font-medium rounded-full hover:bg-blue-500 transition-colors"
          >
            Explore Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative w-full h-105 sm:h-130 md:h-150 rounded-3xl overflow-hidden"
        >
          <Image
            src="/brand/bodybuilding.png"
            alt="Athlete training with Healix Pharma"
            fill
            className="object-cover object-[center_20%]"
          />
        </motion.div>
      </div>
    </section>
  );
}