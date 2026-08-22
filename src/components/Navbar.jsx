"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
  { name: "Contact", href: "/contact" },
  { name: "Verify Code", href: "/verify-code" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl"
    >
      <div className="flex items-center justify-between gap-6 px-5 py-2 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/30 shadow-2xl">
        <Link href="/" className="flex items-center shrink-0">
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
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/30 focus-within:border-white/60 transition-colors">
          <Search size={15} className="text-white/70" />
          <input
            type="text"
            placeholder="Search Products..."
            className="bg-transparent outline-none text-sm text-white placeholder-white/60 w-32 md:w-40"
          />
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
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2.5 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-full bg-white/10 border border-white/30 focus-within:border-white/60 transition-colors">
                <Search size={15} className="text-white/70" />
                <input
                  type="text"
                  placeholder="Search Products..."
                  className="bg-transparent outline-none text-sm text-white placeholder-white/60 w-full"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}