"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Search,
  Lock,
  ArrowRight,
  Star,
  Check,
  X,
  Calendar,
  Clock,
  QrCode,
  Award,
  PhoneCall,
  Plus,
} from "lucide-react";
import { verifyProductCode } from "@/lib/verify";

export default function VerificationPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await verifyProductCode(code);
      if (res.success) {
        setResult(res.data);
        setIsModalOpen(true);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("An error occurred during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-75 sm:w-150 h-75 sm:h-150 bg-linear-to-br from-emerald-100/60 via-teal-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-0 w-62.5 sm:w-125 h-62.5sm:h-125 bg-linear-to-bl from-blue-100/50 via-sky-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-blue-200 shadow-sm bg-white p-0.5">
              <Image
                src="/brand/healix-logo.png"
                alt="Healix Pharmaceutical Logo"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1">
                HEALIX <span className="text-blue-600 font-normal">PHARMA</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
                100% Pure Guarantee
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 text-xs font-medium text-slate-600">
            <a
              href="#"
              className="px-4 py-1.5 rounded-full bg-white text-slate-900 shadow-sm font-semibold"
            >
              Verification
            </a>
            <a
              href="#"
              className="px-4 py-1.5 rounded-full hover:text-slate-900 transition-colors"
            >
              Lab Reports
            </a>
            <a
              href="#"
              className="px-4 py-1.5 rounded-full hover:text-slate-900 transition-colors"
            >
              Quality Control
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-sm">
              <Lock className="w-3 h-3 text-emerald-600" /> Secure
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-5 sm:space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-[11px] sm:text-xs text-slate-600">
              <span className="flex items-center text-amber-500 font-bold gap-1">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />{" "}
                4.9
              </span>
              <span className="text-slate-300">|</span>
              <span>
                Trusted by{" "}
                <strong className="text-slate-800 font-semibold">
                  12,000+
                </strong>{" "}
                Doctors
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                Verify Authenticity, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-teal-600 to-emerald-600">
                  Ensure 100% Purity.
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-lg max-w-lg font-normal leading-relaxed">
                Direct batch verification for Healix pharmaceutical products.
                Enter your serial code to view official lab reports.
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Check className="w-3 h-3 stroke-3" />
                </div>
                <span>HPLC Certified 99.8%+ Purity Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Check className="w-3 h-3 stroke-3" />
                </div>
                <span>Instant COA (Certificate of Analysis) Lookup</span>
              </div>
            </div>

            <div className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-lg sm:shadow-xl shadow-slate-200/50">
              <div className="p-4 sm:p-7 rounded-2xl sm:rounded-[20px] bg-linear-to-b from-white to-slate-50/50 space-y-4">
                <form onSubmit={handleVerify} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Batch / Serial Code
                    </label>
                    <span className="text-[10px] sm:text-[11px] text-blue-600 font-medium">
                      On packaging label
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. HLX-9982-GHK"
                      className="w-full bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl sm:rounded-2xl px-3.5 py-3 text-sm font-mono font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all uppercase"
                    />
                    <button
                      type="submit"
                      disabled={loading || !code.trim()}
                      className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white font-semibold rounded-xl sm:rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shrink-0"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Verify</span>
                          <Search className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-500 pt-0.5">
                    Sample:{" "}
                    <button
                      type="button"
                      onClick={() => setCode("HLX-9982-GHK")}
                      className="text-blue-600 font-mono font-bold hover:underline bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100"
                    >
                      HLX-9982-GHK
                    </button>
                  </p>
                </form>

                {result && !isModalOpen && (
                  <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900">
                            Authentic Healix Product
                          </h3>
                          <p className="text-[11px] sm:text-xs text-emerald-700 font-medium">
                            Verified Batch • 100% Guaranteed
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 border-t border-emerald-500/20 text-xs">
                      <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                        <p className="text-[9px] text-slate-400 uppercase font-semibold">
                          Product
                        </p>
                        <p className="font-bold text-slate-800 text-[11px] sm:text-xs truncate">
                          {result.productName}
                        </p>
                      </div>
                      <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                        <p className="text-[9px] text-slate-400 uppercase font-semibold">
                          Batch No.
                        </p>
                        <p className="font-bold text-slate-800 font-mono text-[11px] sm:text-xs">
                          {result.batchNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-rose-900">
                        Verification Unsuccessful
                      </h3>
                      <p className="text-[11px] sm:text-xs text-rose-700 mt-0.5">
                        {error}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 pt-1">
              <button className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5">
                <span>Check Score</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button className="flex-1 sm:flex-initial bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm shadow-sm transition-all text-center">
                Download COA
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative h-85 sm:h-125 w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white bg-slate-200">
                <Image
                  src="/brand/nurse.png"
                  alt="Healix Certified Professional"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent" />
              </div>

              <div className="absolute top-4 left-3 sm:top-12 sm:-left-10 bg-slate-900/95 backdrop-blur-md text-white p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border border-slate-800 w-36 sm:w-48 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-medium">
                  <span>Batch Quality</span>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-lg sm:text-2xl font-extrabold tracking-tight text-white flex items-baseline gap-1">
                  99.8
                  <span className="text-[10px] sm:text-xs font-normal text-slate-400">
                    %
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1 sm:h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[99.8%]" />
                </div>
                <p className="text-[9px] sm:text-[10px] text-emerald-400 font-medium">
                  Grade A Bio-Peptide
                </p>
              </div>

              <div className="absolute -bottom-4 left-3 sm:-bottom-6 sm:-left-8 w-28 h-24 sm:w-44 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-white shadow-lg bg-slate-100">
                <Image
                  src="/brand/hero1.png"
                  alt="Healix Storefront"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-3 right-3 sm:bottom-8 sm:-right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg space-y-1 sm:space-y-2 max-w-42.5 sm:max-w-55">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-slate-800">
                      100% Pure
                    </h4>
                    <p className="text-[8px] sm:text-[10px] text-slate-500">
                      Official Vials
                    </p>
                  </div>
                </div>
                <div className="text-[9px] sm:text-[11px] text-slate-600 bg-slate-50 p-1 sm:p-2 rounded border border-slate-100 font-mono">
                  HLX-GHK-100
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-slate-950/80 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto md:overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all cursor-pointer border border-slate-200 shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="md:col-span-5 bg-linear-to-b from-[#0B1E48] via-[#0D255A] to-[#071330] text-white p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              <Plus className="absolute top-4 left-6 w-8 h-8 text-white/10 stroke-[1.5] pointer-events-none" />
              <Plus className="absolute bottom-12 left-4 w-10 h-10 text-white/10 stroke-[1.5] pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2.5">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 shadow-md shrink-0">
                  <Image
                    src="/brand/healix-logo.png"
                    alt="Healix Logo"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black tracking-wider text-white uppercase leading-tight">
                    HEALIX
                  </h3>
                  <p className="text-[9px] sm:text-[10px] tracking-widest text-blue-200 uppercase font-bold">
                    PHARMACEUTICAL
                  </p>
                </div>
              </div>

              {/* Compact Image Card */}
              <div className="relative z-10 my-4">
                <div className="relative w-full h-44 sm:h-56 rounded-xl sm:rounded-2xl bg-white p-1 shadow-xl border border-white/30 overflow-hidden">
                  <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src="/brand/nurse3.png"
                      alt="Healix Pharmacy Specialist"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-2 -right-1 sm:-right-2 bg-linear-to-r from-sky-400 to-blue-500 text-white px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-lg border border-white/30 flex items-center gap-1.5 z-20">
                  <div className="w-5 h-5 rounded-full bg-white text-blue-700 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-3 h-3" />
                  </div>
                  <div className="text-[9px] sm:text-[10px]">
                    <p className="text-sky-100 font-medium leading-none">
                      Our Phone:
                    </p>
                    <p className="font-bold text-white tracking-wide mt-0.5">
                      +971 4 552 5032
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Feature List */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-1 gap-1 text-[11px] sm:text-xs font-medium text-white/95 pt-1">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 stroke-3" />
                  <span>Wellness Advice</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 stroke-3" />
                  <span>Medical Supplies</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 stroke-3" />
                  <span>Vitamin Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 stroke-3" />
                  <span>Pharmacy Pickup</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 p-5 sm:p-7 bg-white space-y-4 flex flex-col justify-between md:max-h-[85vh] md:overflow-y-auto">
              <div className="space-y-3 sm:space-y-4 pr-1">
                <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200/80 p-3 rounded-xl sm:rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-base font-bold text-slate-900 leading-tight">
                      GENUINE HEALIX PRODUCT
                    </h4>
                    <p className="text-[10px] sm:text-xs text-emerald-800 font-medium mt-0.5">
                      Verified Batch • 100% Guaranteed Purity
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl sm:rounded-2xl bg-slate-50/50 overflow-hidden text-xs">
                  <div className="p-2.5 sm:p-3 flex items-center justify-between bg-white">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />{" "}
                      Verification Code
                    </span>
                    <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 text-[11px] sm:text-xs">
                      {code.toUpperCase()}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-slate-400" /> Batch
                      No.
                    </span>
                    <span className="font-mono font-bold text-slate-800">
                      {result?.batchNumber || "HLX-2026-B08"}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 flex items-center justify-between bg-white">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> MFG
                      Date
                    </span>
                    <span className="font-medium text-slate-800">Aug 2026</span>
                  </div>

                  <div className="p-2.5 sm:p-3 flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> EXP
                      Date
                    </span>
                    <span className="font-medium text-slate-800">
                      {result?.expDate || "Jul 2028"}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 flex items-center justify-between bg-white">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{" "}
                      Scan Status
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] sm:text-xs border border-emerald-200">
                      First Scan <Check className="w-3 h-3 stroke-3" />
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> Verified
                      On
                    </span>
                    <span className="font-medium text-slate-700 text-[11px]">
                      13 Aug 2026, 09:45 PM
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 bg-blue-50/80 border border-blue-100 rounded-xl flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px] sm:text-xs">
                    <p className="font-bold text-blue-950">
                      Thank you for choosing Healix Pharmaceutical.
                    </p>
                    <p className="text-blue-700 font-medium">
                      This product is authentic.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <p className="font-bold text-slate-800">Your health.</p>
                    <p className="text-blue-600 font-bold">Our promise.</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs outline-none focus:border-blue-500 w-full sm:w-40"
                    />
                    <button className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-slate-800 transition-colors shrink-0">
                      Subscribe
                    </button>
                  </div>
                </div>

                <div className="text-[9px] sm:text-[10px] text-center text-slate-400">
                  © 2026 Healix Pharmaceutical. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
