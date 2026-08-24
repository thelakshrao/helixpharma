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

const comboProducts = [
  {
    id: "ghk-cu",
    name: "GHK-CU",
    dose: "100 MG",
    combo: "/brand/combo1.png",
    short:
      "A copper peptide widely studied for skin repair, collagen support, and tissue remodeling research.",
    about:
      "GHK-Cu is a naturally occurring copper-binding peptide studied extensively in dermatological and regenerative research. It is commonly used in laboratory studies exploring collagen synthesis, wound healing pathways, and antioxidant activity at the cellular level.",
  },
  {
    id: "kisspeptine",
    name: "KISSPEPTINE",
    dose: "10 MG",
    combo: "/brand/combo2.png",
    short:
      "A key regulatory peptide studied for its role in reproductive hormone signaling pathways.",
    about:
      "Kisspeptin is a neuropeptide central to the regulation of the hypothalamic-pituitary-gonadal axis. It is used in research settings to study reproductive hormone release, puberty onset mechanisms, and fertility-related signaling.",
  },
  {
    id: "tesamorelin",
    name: "TESAMORELIN",
    dose: "10 MG",
    combo: "/brand/combo3.png",
    short:
      "A growth hormone-releasing peptide studied for body composition and metabolic research.",
    about:
      "Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH), studied for its effects on growth hormone secretion, visceral fat metabolism, and body composition in clinical and laboratory research.",
  },
  {
    id: "dsip",
    name: "DSIP",
    dose: "10 MG",
    combo: "/brand/combo4.png",
    short:
      "Delta sleep-inducing peptide, researched for its role in sleep regulation and stress response studies.",
    about:
      "DSIP (Delta Sleep-Inducing Peptide) is a neuropeptide studied for its influence on sleep-wake cycles and stress hormone regulation. Researchers use it to explore mechanisms behind delta-wave sleep and neuroendocrine balance.",
  },
  {
    id: "tb-500",
    name: "TB-500",
    dose: "5 MG",
    combo: "/brand/combo5.png",
    short:
      "A synthetic fragment of Thymosin Beta-4, studied for tissue repair and recovery research.",
    about:
      "TB-500 is a synthetic peptide fragment derived from Thymosin Beta-4, studied for its potential role in cell migration, tissue regeneration, and recovery processes across various research models.",
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    dose: "10 MG",
    combo: "/brand/combo6.png",
    short:
      "A stable gastric pentadecapeptide studied for tissue repair, gut health, and recovery research.",
    about:
      "BPC-157 is a synthetic peptide derived from a protein found in gastric juice, widely researched for its potential role in accelerating tissue repair, supporting the gut-healing process, and modulating inflammatory pathways in laboratory models.",
  },
  {
    id: "mots-c",
    name: "MOTS-C",
    dose: "10 MG",
    combo: "/brand/combo7.png",
    short:
      "A mitochondrial-derived peptide researched for metabolic regulation and cellular energy studies.",
    about:
      "MOTS-c is a mitochondrial-derived peptide studied for its role in regulating metabolic homeostasis, insulin sensitivity, and cellular energy production, making it a key focus in metabolic and longevity research.",
  },
  {
    id: "retatrutide",
    name: "RETATRUTIDE",
    dose: "10 MG",
    combo: "/brand/combo8.png",
    short:
      "A triple hormone receptor agonist studied for metabolic and weight regulation research.",
    about:
      "Retatrutide is a novel research peptide that acts on multiple hormone receptor pathways simultaneously. It is studied for its effects on metabolic regulation, appetite signaling, and weight-related research outcomes.",
  },
  {
    id: "pt-141",
    name: "PT-141",
    dose: "10 MG",
    combo: "/brand/combo9.png",
    short:
      "A melanocortin-based peptide studied for its role in central nervous system signaling research.",
    about:
      "PT-141 (Bremelanotide) is a peptide studied for its interaction with melanocortin receptors in the central nervous system, with research focused on its influence on neural signaling pathways.",
  },
  {
    id: "klow-blend",
    name: "KLOW BLEND",
    dose: "80 MG",
    combo: "/brand/combo10.png",
    short:
      "A specialized multi-peptide blend containing BPC157, TB500, GHK-CU, and KPV for advanced recovery research.",
    about:
      "KLOW Blend (80 MG total per vial) combines BPC-157 (10mg), TB-500 (10mg), GHK-Cu (50mg), and KPV (10mg) into a synergistic formulation designed for comprehensive cellular repair, anti-inflammatory, and tissue regeneration research.",
  },
];

function buildPack1Items() {
  return allProductsData.map((p) => ({
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
      item.name.toLowerCase().includes(query.toLowerCase().trim())
    );
  }, [query, packFilter, pack1Items, pack3Items]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const packOptions = [
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
                  {selected.about}
                </p>

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