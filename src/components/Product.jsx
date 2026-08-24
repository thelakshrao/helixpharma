"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
} from "lucide-react";
import { products as products, comboProducts } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

function buildPack1Items() {
  return products.map((p) => ({
    ...p,
    variant: "single",
    image: p.image || p.single || p.combo,
    key: `${p.id}-single`,
  }));
}

function buildPack3Items() {
  return comboProducts.map((p) => ({
    ...p,
    variant: "combo",
    image: p.combo,
    key: `${p.id}-combo`,
  }));
}

const PAGE_SIZE = 6;

function ProductContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const initialPack = searchParams.get("pack");

  const [query, setQuery] = useState("");
  const [packFilter, setPackFilter] = useState(initialPack || "1");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const pack1Items = useMemo(() => buildPack1Items(), []);
  const pack3Items = useMemo(() => buildPack3Items(), []);

  useEffect(() => {
    if (initialPack) setPackFilter(initialPack);
  }, [initialPack]);

  const filtered = useMemo(() => {
    const currentList = packFilter === "3" ? pack3Items : pack1Items;
    return currentList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }, [query, packFilter, pack1Items, pack3Items]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const packOptions = [
    { value: "1", labelKey: "packOf1" },
    { value: "3", labelKey: "packOf3" },
  ];

  return (
    <>
      <section
        id="product"
        className="relative w-full h-[55vh] sm:h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/brand/heroproduct.png"
          alt="Healix Pharma products"
          fill
          priority
          className="object-cover object-center -z-10"
        />
        <div className="absolute inset-0 bg-black/55 -z-10" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none"
          >
            HEALIX PHARMA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-3 text-sm sm:text-lg uppercase tracking-[0.3em] text-white/80 font-light"
          >
            {t("product.hero.eyebrow")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="mt-5 text-white/90 text-sm sm:text-base italic max-w-xl mx-auto"
          >
            {t("product.hero.quote")}
          </motion.p>
        </div>
      </section>

      <section className="relative w-full bg-[#f8fafc] py-14 sm:py-20 px-4 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-10">
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={t("product.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-blue-300 transition"
              />
            </div>

            <div className="flex items-center gap-2">
              {packOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setPackFilter(opt.value);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    packFilter === opt.value
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {t(`nav.${opt.labelKey}`)}
                </button>
              ))}
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm">
              {t("product.noResults")}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {pageItems.map((item, i) => (
                  <motion.button
                    key={item.key + page}
                    onClick={() => setSelected(item)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.05 * i,
                    }}
                    className="text-left rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="relative h-56 bg-slate-50 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-slate-900 font-bold text-base">
                          {item.name}
                        </h3>
                        <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">
                          {item.dose}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.short[lang]}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition ${
                    p === page
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

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
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-[240px_1fr] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-700 transition"
              >
                <X size={16} />
              </button>

              <div className="relative h-70 sm:h-80 bg-slate-50 overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover object-center"
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
    </>
  );
}

export default function Product() {
  return (
    <Suspense fallback={null}>
      <ProductContent />
    </Suspense>
  );
}
