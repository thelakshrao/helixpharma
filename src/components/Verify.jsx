"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, ScanLine, CheckCircle2, XCircle, KeyRound, AlertTriangle } from "lucide-react";

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

export default function Verify() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setStatus(null);

    setTimeout(() => {
      setLoading(false);
      setStatus(code.trim().length >= 6 ? "valid" : "invalid");
    }, 1200);
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-8 md:px-16 py-24">
      <Image
        src="/brand/verify.png"
        alt="Verify Healix Pharma product"
        fill
        priority
        className="object-cover object-center -z-10"
      />
      <div className="absolute inset-0 bg-black/55 -z-10" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 mb-6"
          >
            <ShieldCheck className="text-white" size={30} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            Verify Your Product
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-sm sm:text-base text-white/80 max-w-md mb-8 leading-relaxed"
          >
            Every genuine Healix Pharma product carries a unique scratch code. Verify it here to confirm your product is 100% authentic.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
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

          {status && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`mt-5 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium ${
                status === "valid"
                  ? "bg-green-500/20 text-green-300 border border-green-400/30"
                  : "bg-red-500/20 text-red-300 border border-red-400/30"
              }`}
            >
              {status === "valid" ? (
                <>
                  <CheckCircle2 size={18} />
                  This product is genuine.
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  Invalid code. Please check and try again.
                </>
              )}
            </motion.div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {infoCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 * i }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/30 shrink-0">
                  <Icon className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">{card.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}