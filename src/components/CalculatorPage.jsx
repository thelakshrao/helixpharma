"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Syringe, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const VIAL_PRESETS = [2, 5, 10, 15];
const WATER_PRESETS = [1, 2, 3, 5];
const DOSE_PRESETS = {
  mcg: [50, 100, 150, 250, 500],
  mg: [1, 2, 4, 5, 10],
};
const SYRINGE_TYPES = [
  { id: "u100", label: "syringeU100", units: 100 },
  { id: "u40", label: "syringeU40", units: 40 },
];

function MiniSyringeIcon() {
  return (
    <svg
      width="36"
      height="12"
      viewBox="0 0 44 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="7"
        x2="8"
        y2="7"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="8" y="2" width="3" height="10" fill="#F97316" rx="0.5" />
      <rect
        x="11"
        y="3"
        width="22"
        height="8"
        rx="0.5"
        stroke="#2563EB"
        strokeWidth="1"
        fill="#FFFFFF"
      />
      <rect x="11" y="3" width="10" height="8" fill="#BFDBFE" opacity="0.8" />
      <rect x="33" y="2" width="3" height="10" fill="#F97316" rx="0.5" />
      <line x1="36" y1="7" x2="42" y2="7" stroke="#F97316" strokeWidth="1.5" />
      <line
        x1="42"
        y1="3"
        x2="42"
        y2="11"
        stroke="#F97316"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AnimatedSyringe({ units = 0, totalUnits = 100 }) {
  const percentage = Math.min(Math.max((units / totalUnits) * 100, 0), 100);

  return (
    <div className="w-full my-3 py-3 px-2 bg-slate-50 border border-slate-100 rounded-xl flex flex-col items-center">
      <div className="relative w-full max-w-[320px] h-20 flex items-center justify-center">
        <div className="flex items-center z-10 -mr-px">
          <div className="w-5 h-[1.5px] bg-slate-400" />
          <div className="w-2.5 h-10 bg-orange-500 rounded-l-xs z-10" />
        </div>

        <div className="relative w-60 h-10 border-2 border-slate-800 bg-white rounded-xs z-20">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-blue-200 border-r-2 border-blue-400 relative"
          >
            {units > 0 && (
              <div className="absolute -top-7 right-0 transform translate-x-1/2 flex flex-col items-center pointer-events-none z-40">
                <span className="text-[10px] font-black text-blue-400 bg-white px-1.5 py-0.5 rounded border border-blue-200 shadow-2xs whitespace-nowrap leading-none">
                  {units.toFixed(1)} u
                </span>
                <div className="w-px h-1.5 bg-blue-400" />
              </div>
            )}
          </motion.div>

          <div className="absolute inset-0 flex pointer-events-none z-30">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((mark) => (
              <div
                key={mark}
                className="absolute top-0 bottom-0 flex flex-col justify-end items-center"
                style={{ left: `${mark}%` }}
              >
                <div
                  className={`w-px bg-slate-700 ${
                    mark % 20 === 0 ? "h-3.5" : "h-2"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center z-10 -ml-px">
          <div className="w-2.5 h-10 bg-orange-500 rounded-r-xs z-10" />
          <div className="w-3.5 h-0.5 bg-orange-500" />
          <div className="w-[2.5px] h-7 bg-orange-500 rounded-xs" />
        </div>
      </div>

      <div className="relative w-60 h-4 text-[9px] font-bold text-slate-500 -mt-2">
        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
          <span
            key={num}
            className="absolute transform -translate-x-1/2"
            style={{ left: `${num}%` }}
          >
            {num}
          </span>
        ))}
      </div>

      <p className="text-[10px] font-bold text-slate-500 mt-2 text-center">
        U-100 Insulin Syringe Scale
      </p>
      {units > 0 && (
        <p className="text-[9px] text-slate-400 text-center mt-0.5">
          Draw volume up to line marker of {units.toFixed(1)} Units inside your
          U-100 syringe.
        </p>
      )}
    </div>
  );
}

function OptionRow({
  options,
  selected,
  onSelect,
  otherValue,
  onOtherChange,
  otherLabel,
  suffix,
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(String(opt))}
          className={`py-1.5 px-1.5 rounded-lg border text-xs font-bold transition flex flex-col items-center justify-center leading-none ${
            selected === String(opt) && selected !== "other"
              ? "bg-blue-50 border-blue-400 text-blue-400 shadow-2xs"
              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
          }`}
        >
          <span>{opt}</span>
          {suffix && (
            <span className="text-[9px] font-medium text-slate-400 mt-0.5">
              {suffix}
            </span>
          )}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onSelect("other")}
        className={`py-1.5 px-1.5 rounded-lg border text-xs font-bold transition flex items-center justify-center ${
          selected === "other"
            ? "bg-blue-50 border-blue-400 text-blue-400 shadow-2xs"
            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
        }`}
      >
        {otherLabel}
      </button>
      {selected === "other" && (
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder={otherLabel}
          autoFocus
          className="col-span-3 sm:col-span-5 mt-1 w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs font-medium outline-none focus:border-blue-400 transition"
        />
      )}
    </div>
  );
}

export default function PeptideCalculator() {
  const { t } = useLanguage();

  const [syringeType, setSyringeType] = useState("u100");
  const [vialChoice, setVialChoice] = useState("10");
  const [vialOther, setVialOther] = useState("");
  const [waterChoice, setWaterChoice] = useState("1");
  const [waterOther, setWaterOther] = useState("");
  const [doseUnit, setDoseUnit] = useState("mg");
  const [doseChoice, setDoseChoice] = useState("1");
  const [doseOther, setDoseOther] = useState("");
  const [result, setResult] = useState(null);

  const resolvedVial = vialChoice === "other" ? vialOther : vialChoice;
  const resolvedWater = waterChoice === "other" ? waterOther : waterChoice;
  const resolvedDose = doseChoice === "other" ? doseOther : doseChoice;

  const handleUnitChange = (unit) => {
    setDoseUnit(unit);
    setDoseChoice(String(DOSE_PRESETS[unit][0]));
    setDoseOther("");
  };

  const calculate = () => {
    const vial = parseFloat(resolvedVial);
    const water = parseFloat(resolvedWater);
    const doseVal = parseFloat(resolvedDose);
    const syringeUnits =
      SYRINGE_TYPES.find((s) => s.id === syringeType)?.units || 100;

    if (!vial || !water || !doseVal) {
      setResult(null);
      return;
    }

    const concentrationMgPerMl = vial / water;
    const doseMg = doseUnit === "mcg" ? doseVal / 1000 : doseVal;
    const drawVolumeMl = doseMg / concentrationMgPerMl;
    const drawUnits = drawVolumeMl * syringeUnits;
    const dosesPerVial = vial / doseMg;
    const perUnitMcg = (concentrationMgPerMl * 1000) / syringeUnits;
    const exceeds = drawUnits > syringeUnits;

    setResult({
      concentrationMgPerMl,
      drawVolumeMl,
      drawUnits,
      dosesPerVial,
      perUnitMcg,
      exceeds,
    });
  };

  const reset = () => {
    setSyringeType("u100");
    setVialChoice("10");
    setVialOther("");
    setWaterChoice("1");
    setWaterOther("");
    setDoseUnit("mg");
    setDoseChoice("1");
    setDoseOther("");
    setResult(null);
  };

  return (
    <>
      <section className="relative w-full pt-34 pb-12 sm:pt-42 sm:pb-20 px-4 sm:px-8 bg-[#f8fafc] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-75 sm:h-112.5 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/brand/lab2.jpg"
            alt="Hero background"
            fill
            priority
            unoptimized
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#f8fafc]/50 to-[#f8fafc]" />
        </div>

        <div className="relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-blue-400 font-semibold mb-1.5 sm:mb-2"
            >
              {t("calculator.eyebrow")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight px-2"
            >
              {t("calculator.title")}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2.5 sm:mt-3 inline-block"
            >
              <span className="text-sm sm:text-2xl font-black text-slate-900 bg-blue-100/80 px-2 sm:px-3 py-0.5 rounded backdrop-blur-sm">
                {t("calculator.badge")}
              </span>
              <div className="w-8 sm:w-12 h-1 bg-blue-400 rounded-full mx-auto mt-2" />
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 sm:mb-1.5">
                {t("calculator.intro.title1")}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                {t("calculator.intro.body1")}
              </p>
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 sm:mb-1.5">
                {t("calculator.intro.title2")}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                {t("calculator.intro.body2")}
              </p>
            </div>
          </div>

          {/* Calculator Grid Section */}
          <div className="max-w-5xl mx-auto relative">
            <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none">
              <Image
                src="/brand/product.png"
                alt=""
                width={400}
                height={400}
                unoptimized
                className="object-contain opacity-20 rotate-[-8deg]"
              />
            </div>
            <div className="hidden lg:block absolute -right-10 -bottom-10 -z-10 pointer-events-none select-none">
              <Image
                src="/brand/product.png"
                alt=""
                width={240}
                height={240}
                unoptimized
                className="object-contain opacity-[0.14] rotate-12"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 items-start">
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-100 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] p-4 sm:p-5 space-y-3.5">
                <div>
                  <p className="text-xs font-bold text-slate-900 mb-1.5">
                    {t("calculator.form.syringeQuestion")}
                  </p>
                  <div className="space-y-1.5">
                    {SYRINGE_TYPES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSyringeType(s.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition ${
                          syringeType === s.id
                            ? "bg-blue-50 border-blue-400"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold ${
                            syringeType === s.id
                              ? "text-blue-400"
                              : "text-slate-800"
                          }`}
                        >
                          {t(`calculator.form.${s.label}`)}
                        </span>
                        <MiniSyringeIcon />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-900 mb-1.5">
                    {t("calculator.form.vialQuestion")}
                  </p>
                  <OptionRow
                    options={VIAL_PRESETS}
                    selected={vialChoice}
                    onSelect={setVialChoice}
                    otherValue={vialOther}
                    onOtherChange={setVialOther}
                    otherLabel={t("calculator.form.other")}
                    suffix="mg"
                  />
                </div>

                {/* Step 3 */}
                <div>
                  <p className="text-xs font-bold text-slate-900 mb-1.5">
                    {t("calculator.form.waterQuestion")}
                  </p>
                  <OptionRow
                    options={WATER_PRESETS}
                    selected={waterChoice}
                    onSelect={setWaterChoice}
                    otherValue={waterOther}
                    onOtherChange={setWaterOther}
                    otherLabel={t("calculator.form.other")}
                    suffix="mL"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-bold text-slate-900">
                      {t("calculator.form.doseQuestion")}
                    </p>
                    <div className="flex rounded-full border border-slate-200 overflow-hidden shrink-0">
                      {["mcg", "mg"].map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => handleUnitChange(u)}
                          className={`px-2.5 py-0.5 text-[10px] font-bold transition ${
                            doseUnit === u
                              ? "bg-slate-900 text-white"
                              : "bg-white text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  <OptionRow
                    options={DOSE_PRESETS[doseUnit]}
                    selected={doseChoice}
                    onSelect={setDoseChoice}
                    otherValue={doseOther}
                    onOtherChange={setDoseOther}
                    otherLabel={t("calculator.form.other")}
                    suffix={doseUnit}
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={calculate}
                    className="flex-1 py-2.5 rounded-xl bg-blue-400 text-white text-xs font-bold hover:bg-blue-700 transition"
                  >
                    {t("calculator.form.calculateButton")}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    aria-label={t("calculator.form.resetButton")}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition shrink-0"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              <div className="sticky top-20 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-blue-400 shadow-[0_6px_30px_-8px_rgba(37,99,235,0.2)] p-4 sm:p-5 flex flex-col justify-between">
                {result ? (
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 text-center mb-1">
                        To have a dose of{" "}
                        <span className="underline decoration-slate-300">
                          {resolvedDose} {doseUnit}
                        </span>{" "}
                        pull the syringe to{" "}
                        <span className="bg-blue-400 text-white px-2 py-0.5 rounded-md inline-block text-xs">
                          {result.drawUnits.toFixed(1)} Units
                        </span>
                      </h3>

                      <AnimatedSyringe units={result.drawUnits} />
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 mt-2">
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                        <p className="text-[8px] font-bold tracking-wider uppercase text-slate-400">
                          {t("calculator.results.concentration")}
                        </p>
                        <p className="text-xs font-black text-slate-900 mt-0.5">
                          {result.concentrationMgPerMl.toFixed(1)} MG/ML
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                        <p className="text-[8px] font-bold tracking-wider uppercase text-slate-400">
                          Per Unit Contains
                        </p>
                        <p className="text-xs font-black text-slate-900 mt-0.5">
                          {result.perUnitMcg.toFixed(1)} MCG
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                        <p className="text-[8px] font-bold tracking-wider uppercase text-slate-400">
                          Total Doses
                        </p>
                        <p className="text-xs font-black text-slate-900 mt-0.5">
                          {Math.floor(result.dosesPerVial)} DOSES
                        </p>
                      </div>
                    </div>

                    {result.exceeds && (
                      <p className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 mt-2 leading-relaxed">
                        {t("calculator.results.exceedsSyringe")}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-8">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <Syringe size={20} className="text-blue-400" />
                    </div>
                    <p className="text-xs sm:text-sm font-black text-slate-900 tracking-wide mb-1">
                      {t("calculator.results.awaitingTitle")}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed max-w-[24ch]">
                      {t("calculator.results.awaitingDesc")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-6 max-w-2xl mx-auto px-4">
            {t("calculator.disclaimer")}
          </p>
        </div>
      </section>
    </>
  );
}
