"use client";
import { createContext, useContext, useState } from "react";
import en from "@/locales/en.json";
import th from "@/locales/th.json";
import calculatorEn from "@/locales/calculator-en.json";
import calculatorTh from "@/locales/calculator-th.json";

const translations = {
  en: { ...en, ...calculatorEn },
  th: { ...th, ...calculatorTh },
};
const LanguageContext = createContext();

export function LanguageProvider({ children, initialLang = "en" }) {
  const [lang, setLang] = useState(
    initialLang === "th" ? "th" : "en"
  );

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "th" : "en";
    setLang(newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("lang", newLang);
  };

  const t = (key) => {
    return key.split(".").reduce((obj, k) => obj?.[k], translations[lang]) || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);