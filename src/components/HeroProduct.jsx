"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroProduct() {
  return (
    <section className="relative w-full bg-[#f8fafc] py-16 sm:py-20 md:py-8 px-6 sm:px-10 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-70 sm:h-95 md:h-115 rounded-3xl overflow-hidden"
        >
          <Image
            src="/brand/hero.png"
            alt="Healix Pharma product"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col rounded-3xl p-6 sm:p-8 md:p-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-blue-400" />
            <p className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-semibold">
              Healix Pharma
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-5">
            Crafted with precision, backed by science.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-3">
            Every Healix Pharma product is manufactured under strict quality control, ensuring{" "}
            <span className="text-blue-400 font-semibold">100% purity</span> you can rely on.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-8">
            From research-grade compounds to advanced formulations, we combine cutting-edge technology with rigorous testing to deliver products that meet the highest industry standards, every single time.
          </p>

          <div className="flex justify-start md:justify-end">
            <Link
              href="/product"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-400 text-white text-sm font-medium rounded-full hover:bg-blue-500 transition-colors"
            >
              View All Products
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}