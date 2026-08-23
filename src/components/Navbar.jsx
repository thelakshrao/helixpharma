"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { products } from "@/data/products";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
  { name: "Contact", href: "/contact" },
  { name: "Verify Code", href: "/verify-code" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (e, href) => {
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }, [query]);

  const goToProduct = (id) => {
    setQuery("");
    setShowResults(false);
    setIsOpen(false);
    router.push(`/?product=${id}#our-research-peptides`);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl"
    >
      <div className="flex items-center justify-between gap-6 px-5 py-2 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/30 shadow-2xl">
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center shrink-0"
        >
          <Image
            src="/brand/healix-logo.png"
            alt="Healix logo"
            width={55}
            height={55}
            priority
            className="object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block relative">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/30 focus-within:border-white/60 transition-colors">
            <Search size={15} className="text-white/70" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
              placeholder="Search Products..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/60 w-32 md:w-40"
            />
          </div>

          <AnimatePresence>
            {showResults && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 right-0 w-56 rounded-xl bg-white shadow-2xl border border-slate-100 overflow-hidden z-50"
              >
                {results.map((p) => (
                  <button
                    key={p.id}
                    onMouseDown={() => goToProduct(p.id)}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="text-xs text-blue-500">{p.dose}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-white z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden mt-2 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsOpen(false);
                  }}
                  className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2.5 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="relative mt-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/30 focus-within:border-white/60 transition-colors">
                  <Search size={15} className="text-white/70" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowResults(true);
                    }}
                    placeholder="Search Products..."
                    className="bg-transparent outline-none text-sm text-white placeholder-white/60 w-full"
                  />
                </div>

                {showResults && results.length > 0 && (
                  <div className="mt-2 rounded-xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
                    {results.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => goToProduct(p.id)}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium">{p.name}</span>
                        <span className="text-xs text-blue-500">{p.dose}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
