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
import { products as allProductsData } from "@/data/products";

const products = [
  {
    id: "ghk-cu",
    name: "GHK-CU",
    dose: "100 MG",
    combo: "/brand/combo1.jpeg",
    single: "/brand/product1.jpeg",
    short:
      "A copper peptide widely studied for skin repair, collagen support, and tissue remodeling research.",
    about:
      "GHK-Cu is a naturally occurring copper-binding peptide studied extensively in dermatological and regenerative research. It is commonly used in laboratory studies exploring collagen synthesis, wound healing pathways, and antioxidant activity at the cellular level.",
  },
  {
    id: "kisspeptine",
    name: "KISSPEPTINE",
    dose: "10 MG",
    combo: "/brand/combo2.jpeg",
    single: "/brand/product2.jpeg",
    short:
      "A key regulatory peptide studied for its role in reproductive hormone signaling pathways.",
    about:
      "Kisspeptin is a neuropeptide central to the regulation of the hypothalamic-pituitary-gonadal axis. It is used in research settings to study reproductive hormone release, puberty onset mechanisms, and fertility-related signaling.",
  },
  {
    id: "tesamorelin",
    name: "TESAMORELIN",
    dose: "10 MG",
    combo: "/brand/combo3.jpeg",
    single: "/brand/product3.jpeg",
    short:
      "A growth hormone-releasing peptide studied for body composition and metabolic research.",
    about:
      "Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH), studied for its effects on growth hormone secretion, visceral fat metabolism, and body composition in clinical and laboratory research.",
  },
  {
    id: "dsip",
    name: "DSIP",
    dose: "10 MG",
    combo: "/brand/combo4.jpeg",
    single: "/brand/product4.jpeg",
    short:
      "Delta sleep-inducing peptide, researched for its role in sleep regulation and stress response studies.",
    about:
      "DSIP (Delta Sleep-Inducing Peptide) is a neuropeptide studied for its influence on sleep-wake cycles and stress hormone regulation. Researchers use it to explore mechanisms behind delta-wave sleep and neuroendocrine balance.",
  },
  {
    id: "tb-500",
    name: "TB-500",
    dose: "5 MG",
    combo: "/brand/combo5.jpeg",
    single: "/brand/product5.jpeg",
    short:
      "A synthetic fragment of Thymosin Beta-4, studied for tissue repair and recovery research.",
    about:
      "TB-500 is a synthetic peptide fragment derived from Thymosin Beta-4, studied for its potential role in cell migration, tissue regeneration, and recovery processes across various research models.",
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    dose: "10 MG",
    combo: "/brand/combo6.jpeg",
    single: "/brand/product6.jpeg",
    short:
      "A stable gastric pentadecapeptide studied for tissue repair, gut health, and recovery research.",
    about:
      "BPC-157 is a synthetic peptide derived from a protein found in gastric juice, widely researched for its potential role in accelerating tissue repair, supporting the gut-healing process, and modulating inflammatory pathways in laboratory models.",
  },
  {
    id: "mots-c",
    name: "MOTS-C",
    dose: "10 MG",
    combo: "/brand/combo7.jpeg",
    single: "/brand/product7.jpeg",
    short:
      "A mitochondrial-derived peptide researched for metabolic regulation and cellular energy studies.",
    about:
      "MOTS-c is a mitochondrial-derived peptide studied for its role in regulating metabolic homeostasis, insulin sensitivity, and cellular energy production, making it a key focus in metabolic and longevity research.",
  },
  {
    id: "retatrutide",
    name: "RETATRUTIDE",
    dose: "10 MG",
    combo: "/brand/combo8.jpeg",
    single: "/brand/product8.jpeg",
    short:
      "A triple hormone receptor agonist studied for metabolic and weight regulation research.",
    about:
      "Retatrutide is a novel research peptide that acts on multiple hormone receptor pathways simultaneously. It is studied for its effects on metabolic regulation, appetite signaling, and weight-related research outcomes.",
  },
  {
    id: "pt-141",
    name: "PT-141",
    dose: "10 MG",
    combo: "/brand/combo9.jpeg",
    single: "/brand/product9.jpeg",
    short:
      "A melanocortin-based peptide studied for its role in central nervous system signaling research.",
    about:
      "PT-141 (Bremelanotide) is a peptide studied for its interaction with melanocortin receptors in the central nervous system, with research focused on its influence on neural signaling pathways.",
  },
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildItems() {
  return products.flatMap((p) => [
    { ...p, variant: "combo", image: p.combo, key: `${p.id}-combo` },
    { ...p, variant: "single", image: p.single, key: `${p.id}-single` },
  ]);
}

function buildAllItems() {
  return allProductsData.map((p) => ({
    ...p,
    variant: "all",
    key: `${p.id}-all`,
  }));
}

const PAGE_SIZE = 6;

function ProductContent() {
  const searchParams = useSearchParams();
  const initialPack = searchParams.get("pack");

  const [query, setQuery] = useState("");
  const [packFilter, setPackFilter] = useState(initialPack || "all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [allItems, setAllItems] = useState(buildItems);
  const [allViewItems, setAllViewItems] = useState(buildAllItems);

  useEffect(() => {
    setAllItems(shuffle(buildItems()));
    setAllViewItems(shuffle(buildAllItems()));
  }, []);

  useEffect(() => {
    if (initialPack) setPackFilter(initialPack);
  }, [initialPack]);

  const filtered = useMemo(() => {
    if (packFilter === "all") {
      return allViewItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }
    return allItems.filter((item) => {
      const matchesQuery = item.name
        .toLowerCase()
        .includes(query.toLowerCase().trim());
      const matchesPack =
        packFilter === "1"
          ? item.variant === "single"
          : item.variant === "combo";
      return matchesQuery && matchesPack;
    });
  }, [query, packFilter, allItems, allViewItems]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const packOptions = [
    { value: "all", label: "All" },
    { value: "1", label: "Pack of 1" },
    { value: "3", label: "Pack of 3" },
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
            Products
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="mt-5 text-white/90 text-sm sm:text-base italic max-w-xl mx-auto"
          >
            "Purity engineered for research, trusted by scientists worldwide."
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
                placeholder="Search products..."
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
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm">
              No products found matching your search.
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
                      {item.variant === "combo" && (
                        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide bg-white text-black px-2.5 py-1 rounded-full">
                          Pack of 3
                        </span>
                      )}
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
                        {item.short}
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

              <div className="relative h-52 sm:h-full bg-slate-50 overflow-hidden">
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
                  {selected.variant === "combo" && (
                    <span className="text-xs font-semibold text-white bg-blue-500 px-2.5 py-1 rounded-full">
                      Combo
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {selected.name}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selected.about}
                </p>

                <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 mb-6">
                  <p className="text-slate-500 text-xs">
                    For research use only. Not for human consumption.
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
                >
                  Close
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
