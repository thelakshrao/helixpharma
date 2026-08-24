"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ShieldCheck } from "lucide-react";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

export default function LandingPageProduct() {
  const { t, lang } = useLanguage();
  const scrollRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    const productId = searchParams.get("product");

    if (!productId) return;

    const match = products.find((p) => p.id === productId);

    if (match) {
      setTimeout(() => {
        document.getElementById("our-research-peptides")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setSelected(match);
      }, 300);
    }
  }, [searchParams]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="our-research-peptides"
      className="relative w-full bg-[#f8fafc] py-8 sm:py-10 md:py-10 px-4 sm:px-8 md:px-16 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-0.5 bg-blue-400" />

          <p className="text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-semibold">
            {t("landingProduct.eyebrow")}
          </p>
        </div>

        <div className="flex items-end justify-between mb-8">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-snug max-w-xl">
            {t("landingProduct.heading")}
          </h2>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll products left"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label="Scroll products right"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-[5%] sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
        >
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setSelected(p)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.05 * i,
              }}
              className="snap-center shrink-0 w-full sm:w-[45%] md:w-[calc(33.333%-16px)] text-left rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="relative h-56 bg-slate-50 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover object-center scale-70 group-hover:scale-[0.9] transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-900 font-bold text-base">
                    {p.name}
                  </h3>

                  <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">
                    {p.dose}
                  </span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {p.short[lang]}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex sm:hidden justify-center gap-2 mt-4">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll products left"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll products right"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-[240px_1fr] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close product details"
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-700 transition"
              >
                <X size={16} />
              </button>

              <div className="relative h-52 sm:h-full bg-slate-50 overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover object-center scale-80"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-blue-500" />
                  </div>

                  <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">
                    {selected.dose}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {selected.name}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selected.about[lang]}
                </p>

                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
                >
                  {t("landingProduct.close")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
