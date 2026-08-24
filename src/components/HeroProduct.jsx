"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, FlaskConical, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const trustPoints = [
  { icon: ShieldCheck, key: "clinicallyTested" },
  { icon: FlaskConical, key: "qualityChecked" },
  { icon: BadgeCheck, key: "purity" },
];

export default function HeroProduct() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#f8fafc] py-10 sm:py-16 md:py-8 px-6 sm:px-10 md:px-16 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1e293b 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full h-70 sm:h-95 md:h-115 rounded-3xl overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-full bg-blue-400/30 blur-[60px]" />
          </div>

          <Image
            src="/brand/hero.png"
            alt="Healix Pharma product"
            fill
            className="object-cover relative"
          />

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/20 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col rounded-3xl p-6 sm:p-8 md:p-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-blue-400" />
            <p className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-semibold">
              Healix Pharma
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
            {t("heroProduct.headingPart1")}{" "}
            <span className="text-blue-400">{t("heroProduct.headingHighlight1")}</span>,
            <br className="hidden sm:block" /> {t("heroProduct.headingPart2")}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-3">
            {t("heroProduct.paragraph1Part1")}{" "}
            <span className="text-blue-400 font-semibold">{t("heroProduct.purityHighlight")}</span>{" "}
            {t("heroProduct.paragraph1Part2")}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6">
            {t("heroProduct.paragraph2")}
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
            {trustPoints.map(({ icon: Icon, key }) => (
              <div key={key} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-blue-400" strokeWidth={2} />
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  {t(`heroProduct.trust.${key}`)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 justify-start md:justify-end">
            <Link
              href="/product#benefits"
              className="text-sm font-medium text-slate-600 hover:text-blue-500 transition-colors"
            >
              {t("heroProduct.seeBenefits")}
            </Link>
            <Link
              href="/product"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-400 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all"
            >
              {t("heroProduct.viewAllProducts")}
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