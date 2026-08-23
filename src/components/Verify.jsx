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

const infoCards = [
  {
    icon: ScanLine,
    title: "Locate the panel",
    desc: "Flip your box and find the silver scratch panel printed on the back label.",
  },
  {
    icon: KeyRound,
    title: "Reveal the code",
    desc: "Gently scratch it off with a coin to reveal your unique verification code.",
  },
  {
    icon: AlertTriangle,
    title: "One-time use",
    desc: "Each code works only once. If it's already scratched at purchase, don't use the product.",
  },
];

const resultConfig = {
  valid: {
    icon: CheckCircle2,
    accent: "text-blue-600",
    badgeBg: "bg-blue-50",
    badgeBorder: "border-blue-100",
    title: "Genuine Product",
    subtitle: "Your product has been successfully verified.",
    note: "Thank you for choosing Healix Pharmaceutical. This product is authentic.",
  },

  already_used: {
    icon: AlertTriangle,
    accent: "text-amber-600",
    badgeBg: "bg-amber-50",
    badgeBorder: "border-amber-100",
    title: "Already Verified",
    subtitle: "This code has already been used before.",
    note: "If you didn't scratch this code yourself, please don't use this product and contact us.",
  },

  invalid: {
    icon: XCircle,
    accent: "text-red-600",
    badgeBg: "bg-red-50",
    badgeBorder: "border-red-100",
    title: "Invalid Code",
    subtitle: "We couldn't verify this code.",
    note: "Please double-check the code, or contact our support team before using this product.",
  },

  error: {
    icon: XCircle,
    accent: "text-red-600",
    badgeBg: "bg-red-50",
    badgeBorder: "border-red-100",
    title: "Something Went Wrong",
    subtitle: "Please try again in a moment.",
    note: "If this keeps happening, reach out to our support team for help.",
  },
};

export default function Verify() {
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

  const result = status ? resultConfig[status] : null;
  const ResultIcon = result?.icon;

  const isValid = status === "valid";

  const verifiedOn = new Date().toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section
      id="verify"
      className="relative w-full min-h-screen sm:min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-8 md:px-16 pt-32 pb-16 sm:py-24"
    >
      <Image
        src="/brand/verify.png"
        alt="Verify Healix Pharma product"
        fill
        priority
        className="object-cover object-[70%_center] sm:object-center -z-10"
      />

      <div className="absolute inset-0 bg-black/55 -z-10" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 mb-6"
          >
            <ShieldCheck className="text-white" size={30} />
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
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            Verify Your Product
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
            className="text-sm sm:text-base text-white/80 max-w-md mb-8 leading-relaxed"
          >
            Every genuine Healix Pharma product carries a unique scratch code.
            Verify it here to confirm your product is 100% authentic.
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
            className="w-full flex flex-col sm:flex-row items-stretch gap-3 p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setStatus(null);
              }}
              placeholder="Enter your code"
              className="flex-1 bg-transparent outline-none text-white placeholder-white/50 text-sm sm:text-base px-4 py-3"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-100 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Checking..." : "Verify Now"}
            </motion.button>
          </motion.form>
        </div>

        <div className="flex flex-col gap-4">
          {infoCards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
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
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/30 shrink-0">
                  <Icon className="text-white" size={20} />
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    {card.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showModal && result && (
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
                  className="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md text-white transition"
                >
                  <X size={17} />
                </button>

                <div className="relative bg-black/80 px-8 py-10 flex flex-col items-center text-center overflow-hidden min-h-130 md:min-h-full">
                  <Image
                    src="/brand/lab.png"
                    alt=""
                    fill
                    className="object-cover opacity-25 z-0"
                  />

                  <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/70 z-0" />

                  <div className="relative z-10 flex flex-col items-center text-center w-full">
                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center mb-4">
                      <Image
                        src="/brand/healix-logo.png"
                        alt="Healix Pharma logo"
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="text-white text-xl font-bold leading-snug">
                      HEALIX
                    </h3>

                    <p className="text-white/80 text-xs uppercase tracking-widest mb-6">
                      Pharmaceutical
                    </p>

                    <p className="text-white font-semibold text-sm mb-1">
                      100% Pure.
                    </p>

                    <p className="text-white/80 text-sm mb-8">
                      Always Trusted.
                    </p>

                    <div className="w-full border-t border-white/20 mb-6" />

                    <div className="flex flex-col gap-4 w-full text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
                          <ShieldCheck size={15} className="text-white" />
                        </div>

                        <div>
                          <p className="text-white text-xs font-semibold">
                            100% Authentic
                          </p>

                          <p className="text-white/60 text-[11px]">
                            Genuine product guaranteed
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
                          <FlaskConical size={15} className="text-white" />
                        </div>

                        <div>
                          <p className="text-white text-xs font-semibold">
                            Lab Tested
                          </p>

                          <p className="text-white/60 text-[11px]">
                            Advanced quality assurance
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
                          <Leaf size={15} className="text-white" />
                        </div>

                        <div>
                          <p className="text-white text-xs font-semibold">
                            Research Grade
                          </p>

                          <p className="text-white/60 text-[11px]">
                            For laboratory use only
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/70 italic text-xs mt-8">
                      Your health, our promise!
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-8 py-8">
                  <div className="flex items-start justify-between mb-6 pr-8">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center border ${result.badgeBg} ${result.badgeBorder}`}
                      >
                        <ResultIcon size={22} className={result.accent} />
                      </div>

                      <div>
                        <h2 className={`text-lg font-bold ${result.accent}`}>
                          {result.title}
                        </h2>

                        <p className="text-slate-500 text-sm">
                          {result.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden mb-6">
                    <div className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-50/50">
                      <span className="flex items-center gap-2 text-slate-500 text-sm shrink-0">
                        <ShieldCheck size={14} />
                        Verification Code
                      </span>

                      <span className="text-slate-900 font-semibold text-sm tracking-wide text-right break-all">
                        {code.trim().toUpperCase() || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 px-4 py-3">
                      <span className="flex items-center gap-2 text-slate-500 text-sm shrink-0">
                        <ScanLine size={14} />
                        Scan Status
                      </span>

                      <span
                        className={`flex items-center gap-1 font-semibold text-sm text-right ${
                          isValid
                            ? "text-green-600"
                            : status === "already_used"
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {isValid
                          ? "First Scan"
                          : status === "already_used"
                            ? "Already Scanned"
                            : "Not Found"}

                        <ResultIcon size={14} />
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-50/50">
                      <span className="flex items-center gap-2 text-slate-500 text-sm shrink-0">
                        <Clock size={14} />
                        Verify On
                      </span>

                      <span className="text-slate-900 font-semibold text-sm text-right">
                        {verifiedOn}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-4 mb-6 ${result.badgeBg} ${result.badgeBorder}`}
                  >
                    <ShieldCheck
                      size={18}
                      className={`mt-0.5 shrink-0 ${result.accent}`}
                    />

                    <p
                      className={`text-sm font-medium leading-relaxed ${result.accent}`}
                    >
                      {result.note}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
                  >
                    Close
                  </button>

                  <p className="text-center text-slate-500 text-[11px] mt-4">
                    © 2026 Healix Pharmaceutical. All Rights Reserved.
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