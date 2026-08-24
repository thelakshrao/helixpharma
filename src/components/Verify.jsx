"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ScanLine,
  CheckCircle2,
  XCircle,
  KeyRound,
  AlertTriangle,
  X,
  FlaskConical,
  Leaf,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const infoCardsMeta = [
  { icon: ScanLine, key: "locate" },
  { icon: KeyRound, key: "reveal" },
  { icon: AlertTriangle, key: "oneTime" },
];

const resultMeta = {
  valid: { icon: CheckCircle2, accent: "text-blue-600", badgeBg: "bg-blue-50", badgeBorder: "border-blue-100" },
  already_used: { icon: AlertTriangle, accent: "text-amber-600", badgeBg: "bg-amber-50", badgeBorder: "border-amber-100" },
  invalid: { icon: XCircle, accent: "text-red-600", badgeBg: "bg-red-50", badgeBorder: "border-red-100" },
  error: { icon: XCircle, accent: "text-red-600", badgeBg: "bg-red-50", badgeBorder: "border-red-100" },
};

export default function Verify() {
  const { t, lang } = useLanguage();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const data = await res.json();

      setStatus(data.status);
      setShowModal(true);
    } catch {
      setStatus("error");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const meta = status ? resultMeta[status] : null;
  const ResultIcon = meta?.icon;

  const isValid = status === "valid";

  const verifiedOn = new Date().toLocaleString(lang === "th" ? "th-TH" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section
      id="verify"
      className="relative w-full min-h-fit sm:min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-8 md:px-16 pt-24 pb-12 sm:py-24"
    >
      <Image
        src="/brand/verify.png"
        alt="Verify Healix Pharma product"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      <div className="absolute inset-0 bg-black/55 -z-10" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 mb-4 sm:mb-6"
          >
            <ShieldCheck className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.1,
            }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4"
          >
            {t("verify.hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="text-xs sm:text-base text-white/80 max-w-md mb-6 sm:mb-8 leading-relaxed"
          >
            {t("verify.hero.description")}
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.3,
            }}
            className="w-full flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setStatus(null);
              }}
              placeholder={t("verify.hero.inputPlaceholder")}
              className="flex-1 bg-transparent outline-none text-white placeholder-white/50 text-xs sm:text-base px-3 py-2.5 sm:px-4 sm:py-3"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-gray-900 text-xs sm:text-sm font-semibold rounded-xl hover:bg-gray-100 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? t("verify.hero.checking") : t("verify.hero.verifyButton")}
            </motion.button>
          </motion.form>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {infoCardsMeta.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.key}
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.15 * i,
                }}
                className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
              >
                <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-white/30 shrink-0">
                  <Icon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                <div>
                  <h3 className="text-white font-semibold text-xs sm:text-base mb-0.5 sm:mb-1">
                    {t(`verify.infoCards.${card.key}.title`)}
                  </h3>

                  <p className="text-white/70 text-[11px] sm:text-sm leading-relaxed">
                    {t(`verify.infoCards.${card.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showModal && meta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm px-3 sm:px-4 py-4 sm:py-8 overflow-y-auto overscroll-contain"
            onClick={closeModal}
          >
            <div className="min-h-full flex items-start sm:items-center justify-center">
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
                  duration: 0.4,
                  ease: "easeOut",
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-[280px_1fr] max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
              >
                <button
                  onClick={closeModal}
                  aria-label="Close verification result"
                  className="absolute top-4 right-4 z-50 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md text-white transition"
                >
                  <X size={16} />
                </button>

                <div className="relative bg-black/80 px-6 sm:px-8 py-8 sm:py-10 flex flex-col items-center text-center overflow-hidden min-h-fit md:min-h-full">
                  <Image
                    src="/brand/lab.png"
                    alt=""
                    fill
                    className="object-cover opacity-25 z-0"
                  />

                  <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/70 z-0" />

                  <div className="relative z-10 flex flex-col items-center text-center w-full">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center mb-3 sm:mb-4">
                      <Image
                        src="/brand/healix-logo.png"
                        alt="Healix Pharma logo"
                        width={48}
                        height={48}
                        className="object-contain sm:w-16 sm:h-16"
                      />
                    </div>

                    <h3 className="text-white text-lg sm:text-xl font-bold leading-snug">
                      HEALIX
                    </h3>

                    <p className="text-white/80 text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6">
                      {t("verify.modal.pharmaceutical")}
                    </p>

                    <p className="text-white font-semibold text-xs sm:text-sm mb-0.5">
                      {t("verify.modal.pureLine1")}
                    </p>

                    <p className="text-white/80 text-xs sm:text-sm mb-6 sm:mb-8">
                      {t("verify.modal.pureLine2")}
                    </p>

                    <div className="w-full border-t border-white/20 mb-4 sm:mb-6" />

                    <div className="flex flex-col gap-3 sm:gap-4 w-full text-left">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
                          <ShieldCheck size={14} className="text-white" />
                        </div>

                        <div>
                          <p className="text-white text-xs font-semibold">
                            {t("verify.modal.authentic.title")}
                          </p>

                          <p className="text-white/60 text-[10px] sm:text-[11px]">
                            {t("verify.modal.authentic.desc")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
                          <FlaskConical size={14} className="text-white" />
                        </div>

                        <div>
                          <p className="text-white text-xs font-semibold">
                            {t("verify.modal.labTested.title")}
                          </p>

                          <p className="text-white/60 text-[10px] sm:text-[11px]">
                            {t("verify.modal.labTested.desc")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
                          <Leaf size={14} className="text-white" />
                        </div>

                        <div>
                          <p className="text-white text-xs font-semibold">
                            {t("verify.modal.researchGrade.title")}
                          </p>

                          <p className="text-white/60 text-[10px] sm:text-[11px]">
                            {t("verify.modal.researchGrade.desc")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/70 italic text-[11px] sm:text-xs mt-6 sm:mt-8">
                      {t("verify.modal.promise")}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-8 py-6 sm:py-8">
                  <div className="flex items-start justify-between mb-4 sm:mb-6 pr-6 sm:pr-8">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border ${meta.badgeBg} ${meta.badgeBorder}`}
                      >
                        <ResultIcon size={18} className={`${meta.accent} sm:w-5.5 sm:h-5.5`} />
                      </div>

                      <div>
                        <h2 className={`text-base sm:text-lg font-bold ${meta.accent}`}>
                          {t(`verify.result.${status}.title`)}
                        </h2>

                        <p className="text-slate-500 text-xs sm:text-sm">
                          {t(`verify.result.${status}.subtitle`)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden mb-4 sm:mb-6">
                    <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50/50">
                      <span className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm shrink-0">
                        <ShieldCheck size={14} />
                        {t("verify.details.verificationCode")}
                      </span>

                      <span className="text-slate-900 font-semibold text-xs sm:text-sm tracking-wide text-right break-all">
                        {code.trim().toUpperCase() || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3">
                      <span className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm shrink-0">
                        <ScanLine size={14} />
                        {t("verify.details.scanStatus")}
                      </span>

                      <span
                        className={`flex items-center gap-1 font-semibold text-xs sm:text-sm text-right ${
                          isValid
                            ? "text-green-600"
                            : status === "already_used"
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {isValid
                          ? t("verify.details.firstScan")
                          : status === "already_used"
                            ? t("verify.details.alreadyScanned")
                            : t("verify.details.notFound")}

                        <ResultIcon size={14} />
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50/50">
                      <span className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm shrink-0">
                        <Clock size={14} />
                        {t("verify.details.verifyOn")}
                      </span>

                      <span className="text-slate-900 font-semibold text-xs sm:text-sm text-right">
                        {verifiedOn}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-2.5 sm:gap-3 rounded-2xl border px-3.5 py-3 sm:px-4 sm:py-4 mb-4 sm:mb-6 ${meta.badgeBg} ${meta.badgeBorder}`}
                  >
                    <ShieldCheck
                      size={16}
                      className={`mt-0.5 shrink-0 ${meta.accent} sm:w-4.5 sm:h-4.5`}
                    />

                    <p
                      className={`text-xs sm:text-sm font-medium leading-relaxed ${meta.accent}`}
                    >
                      {t(`verify.result.${status}.note`)}
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition"
                  >
                    {t("verify.close")}
                  </button>

                  <p className="text-center text-slate-500 text-[10px] sm:text-[11px] mt-3 sm:mt-4">
                    {t("verify.copyright")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}