"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative w-full text-slate-900 py-6 px-4 sm:px-8 bg-white border-slate-100">
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <img
            src="/brand/healix-logo.png"
            alt="Healix Pharma Logo"
            className="h-16 sm:h-20 w-auto object-contain"
          />
          <p className="text-xs sm:text-sm font-medium text-slate-700 max-w-md">
            {t("footer.description")}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <p className="text-xs font-semibold text-amber-800 bg-amber-50/90 border border-amber-200 px-3 py-1 rounded-md">
            <span className="font-bold text-amber-900">{t("footer.noteLabel")}</span>{" "}
            {t("footer.noteText")}
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;