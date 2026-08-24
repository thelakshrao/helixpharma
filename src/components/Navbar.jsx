"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, Menu, X, ChevronRight, Clock, Globe } from "lucide-react";
import { products } from "@/data/products";
import { Cinzel } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { key: "home", href: "/" },
  { key: "contact", href: "/contact" },
  { key: "verifyCode", href: "/verify-code" },
  { key: "calculator", href: "/calculator" },
];

const categories = [
  { name: "Injectables", key: "injectables", available: false },
  { name: "Orals", key: "orals", available: false },
  { name: "Peptides", key: "peptides", available: true },
  { name: "SARMs", key: "sarms", available: false },
];

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [peptidesSubOpen, setPeptidesSubOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobilePeptidesOpen, setMobilePeptidesOpen] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  
  // State to track scroll direction (hide on scroll down, show on scroll up)
  const [hidden, setHidden] = useState(false);
  
  const closeTimer = useRef(null);
  const headerRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handle Scroll Direction for Hide/Show Navbar
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Don't hide if the mobile menu is open or if at top of page
    if (latest > previous && latest > 100 && !isOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Detects background behind navbar
  useEffect(() => {
    const checkBackground = () => {
      const probeY = 40;
      const probeX = window.innerWidth / 2;

      const headerEl = headerRef.current;
      const prevPointerEvents = headerEl ? headerEl.style.pointerEvents : null;
      if (headerEl) headerEl.style.pointerEvents = "none";

      const el = document.elementFromPoint(probeX, probeY);

      if (headerEl) headerEl.style.pointerEvents = prevPointerEvents || "";

      let node = el;
      let bg = null;

      while (node && node !== document.body) {
        const color = window.getComputedStyle(node).backgroundColor;
        if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
          bg = color;
          break;
        }
        node = node.parentElement;
      }

      if (bg) {
        const rgb = bg.match(/\d+/g);
        if (rgb) {
          const [r, g, b] = rgb.map(Number);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          setIsLightBg(luminance > 0.65);
        }
      } else {
        setIsLightBg(false);
      }
    };

    checkBackground();
    window.addEventListener("scroll", checkBackground, { passive: true });
    window.addEventListener("resize", checkBackground);
    const interval = setInterval(checkBackground, 500);

    return () => {
      window.removeEventListener("scroll", checkBackground);
      window.removeEventListener("resize", checkBackground);
      clearInterval(interval);
    };
  }, [pathname]);

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

  const handleCategoryClick = (cat) => {
    if (!cat.available) {
      setComingSoon(true);
      setProductMenuOpen(false);
      setMobileProductOpen(false);
      return;
    }
    setPeptidesSubOpen(true);
  };

  const goToPack = (pack) => {
    setProductMenuOpen(false);
    setPeptidesSubOpen(false);
    setMobileProductOpen(false);
    setMobilePeptidesOpen(false);
    setIsOpen(false);
    if (pack === "all") {
      router.push("/product");
    } else {
      router.push(`/product?pack=${pack}`);
    }
  };

  const openProductMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductMenuOpen(true);
  };

  const scheduleCloseProductMenu = () => {
    closeTimer.current = setTimeout(() => {
      setProductMenuOpen(false);
      setPeptidesSubOpen(false);
    }, 200);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: -40 }}
        animate={
          hidden
            ? { opacity: 0, y: "-120%" }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-8xl"
      >
        <div
          className={`flex items-center justify-between gap-6 px-5 py-0 rounded-2xl backdrop-blur-xl border border-white/30 shadow-2xl transition-colors duration-300 ${
            isLightBg ? "bg-black/50" : "bg-black/20"
          }`}
        >
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center shrink-0"
          >
            <Image
              src="/brand/healix-logo.png"
              alt="Healix logo"
              width={75}
              height={75}
              priority
              className="object-contain"
            />
            <span
              className={`${cinzel.className} ml-2 text-white font-bold text-base tracking-[0.15em] uppercase md:hidden`}
            >
              HEALIX PHARMA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {t("nav.home")}
            </Link>

            <div
              className="relative"
              onMouseEnter={openProductMenu}
              onMouseLeave={scheduleCloseProductMenu}
            >
              <button className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1">
                {t("nav.product")}
                <ChevronRight size={12} className="rotate-90" />
              </button>
              <AnimatePresence>
                {productMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-black/20 backdrop-blur-xl border-white/30 shadow-2xl z-999"
                  >
                    <div
                      style={{
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        backgroundColor: "rgba(0,0,0,0.35)",
                      }}
                      className="rounded-xl border border-white/30 shadow-2xl overflow-hidden"
                    >
                      {!peptidesSubOpen ? (
                        <div className="py-1">
                          {categories.map((cat) => (
                            <button
                              key={cat.name}
                              onClick={() => handleCategoryClick(cat)}
                              className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                            >
                              <span>{t(`nav.categories.${cat.key}`)}</span>
                              {!cat.available && (
                                <Clock size={13} className="text-white/40" />
                              )}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="py-1">
                          <button
                            onClick={() => setPeptidesSubOpen(false)}
                            className="w-full text-left px-4 py-2 text-xs text-white/50 hover:text-white/80 flex items-center gap-1"
                          >
                            <ChevronRight size={12} className="rotate-180" />
                            {t("nav.back")}
                          </button>
                          <button
                            onClick={() => goToPack("1")}
                            className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            {t("nav.packOf1")}
                          </button>
                          <button
                            onClick={() => goToPack("3")}
                            className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            {t("nav.packOf3")}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
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
                  placeholder={t("nav.searchPlaceholder")}
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

            {/* Language toggle - desktop */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/30 text-white/90 hover:text-white hover:bg-white/20 transition-colors text-sm font-medium shrink-0"
              aria-label="Toggle language"
            >
              <Globe size={15} />
              {lang === "en" ? "TH" : "EN"}
            </button>
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden text-white z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer - Dynamic background matching navbar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`md:hidden mt-2 rounded-2xl backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden transition-colors duration-300 ${
                isLightBg ? "bg-black/50" : "bg-black/20"
              }`}
            >
              <nav className="flex flex-col p-4 gap-1">
                <Link
                  href="/"
                  onClick={(e) => {
                    handleNavClick(e, "/");
                    setIsOpen(false);
                  }}
                  className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2.5 transition-colors"
                >
                  {t("nav.home")}
                </Link>

                <button
                  onClick={() => setMobileProductOpen((prev) => !prev)}
                  className="w-full text-left text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2.5 transition-colors flex items-center justify-between"
                >
                  {t("nav.product")}
                  <ChevronRight
                    size={14}
                    className={`transition-transform ${mobileProductOpen ? "rotate-90" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileProductOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-3"
                    >
                      {!mobilePeptidesOpen ? (
                        categories.map((cat) => (
                          <button
                            key={cat.name}
                            onClick={() => {
                              if (!cat.available) {
                                setComingSoon(true);
                                setMobileProductOpen(false);
                                setIsOpen(false);
                                return;
                              }
                              setMobilePeptidesOpen(true);
                            }}
                            className="w-full text-left text-sm text-white/80 hover:text-white rounded-lg px-3 py-2 transition-colors flex items-center justify-between"
                          >
                            {t(`nav.categories.${cat.key}`)}
                            {!cat.available && (
                              <Clock size={13} className="text-white/40" />
                            )}
                          </button>
                        ))
                      ) : (
                        <div className="flex flex-col">
                          <button
                            onClick={() => setMobilePeptidesOpen(false)}
                            className="w-full text-left text-xs text-white/50 hover:text-white/80 px-3 py-1.5 flex items-center gap-1"
                          >
                            <ChevronRight size={12} className="rotate-180" />
                            {t("nav.back")}
                          </button>
                          <button
                            onClick={() => goToPack("1")}
                            className="w-full text-left text-sm text-white/80 hover:text-white rounded-lg px-3 py-2 transition-colors"
                          >
                            {t("nav.packOf1")}
                          </button>
                          <button
                            onClick={() => goToPack("3")}
                            className="w-full text-left text-sm text-white/80 hover:text-white rounded-lg px-3 py-2 transition-colors"
                          >
                            {t("nav.packOf3")}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsOpen(false);
                    }}
                    className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2.5 transition-colors"
                  >
                    {t(`nav.${link.key}`)}
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
                      placeholder={t("nav.searchPlaceholder")}
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
                          <span className="text-xs text-blue-500">
                            {p.dose}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Language toggle - mobile */}
                <button
                  onClick={toggleLanguage}
                  className="mt-2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 border border-white/30 text-white/90 hover:text-white hover:bg-white/20 transition-colors text-sm font-medium"
                  aria-label="Toggle language"
                >
                  <Globe size={15} />
                  {lang === "en"
                    ? "เปลี่ยนเป็นไทย (TH)"
                    : "Switch to English (EN)"}
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {comingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setComingSoon(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
                <Clock size={24} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("nav.comingSoonTitle")}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {t("nav.comingSoonDesc")}
              </p>
              <button
                onClick={() => setComingSoon(false)}
                className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
              >
                {t("nav.gotIt")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}