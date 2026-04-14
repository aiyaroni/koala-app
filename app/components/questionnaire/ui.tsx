"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

/* ────────────────────────────────────────────────────────── */
/*  Toggle                                                   */
/* ────────────────────────────────────────────────────────── */
interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  sublabel?: string;
}

export function Toggle({ checked, onChange, label, sublabel }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full p-4 rounded-2xl border transition-all duration-200 text-right"
      style={{
        borderColor: checked ? "#84cc16" : "#44403c",
        background: checked ? "rgba(132,204,22,0.08)" : "rgba(41,37,36,0.5)",
      }}
    >
      <div className="flex flex-col items-start">
        <span className="text-base font-medium text-stone-100">{label}</span>
        {sublabel && (
          <span className="text-sm text-stone-400 mt-0.5">{sublabel}</span>
        )}
      </div>
      {/* Track */}
      <div
        className="relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-200 mr-3"
        style={{ background: checked ? "#84cc16" : "#57534e" }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
          animate={{ left: checked ? "calc(100% - 20px)" : "4px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  PillRadio                                               */
/* ────────────────────────────────────────────────────────── */
interface PillOption {
  value: string;
  label: string;
  emoji?: string;
}

interface PillRadioProps {
  options: PillOption[];
  value: string;
  onChange: (v: string) => void;
}

export function PillRadio({ options, value, onChange }: PillRadioProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200"
          style={{
            borderColor: value === opt.value ? "#84cc16" : "#44403c",
            background:
              value === opt.value
                ? "rgba(132,204,22,0.15)"
                : "rgba(41,37,36,0.5)",
            color: value === opt.value ? "#84cc16" : "#a8a29e",
          }}
        >
          {opt.emoji && <span className="ml-1.5">{opt.emoji}</span>}
          {opt.label}
        </motion.button>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  TextInput                                               */
/* ────────────────────────────────────────────────────────── */
interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  suffix?: string;
  min?: string;
  max?: string;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  suffix,
  min,
  max,
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex items-center">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-4 py-3 rounded-xl border bg-stone-900 text-stone-100 placeholder-stone-500 outline-none transition-all duration-200 text-right"
        style={{ borderColor: isFocused ? "#84cc16" : "#44403c" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {/* Focus underline animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full mx-4"
        animate={{
          scaleX: isFocused ? 1 : 0,
          opacity: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ background: "#84cc16" }}
      />
      {suffix && (
        <span className="absolute left-4 text-stone-400 text-sm font-medium pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  SelectInput                                             */
/* ────────────────────────────────────────────────────────── */
interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export function SelectInput({
  value,
  onChange,
  options,
  placeholder,
}: SelectInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border bg-stone-900 text-stone-100 outline-none transition-all duration-200 appearance-none cursor-pointer text-right"
        style={{ borderColor: isFocused ? "#84cc16" : "#44403c" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Focus underline animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full mx-4"
        animate={{
          scaleX: isFocused ? 1 : 0,
          opacity: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ background: "#84cc16" }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Question wrapper                                        */
/* ────────────────────────────────────────────────────────── */
interface QuestionProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function Question({ label, hint, children }: QuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2.5"
    >
      <div>
        <p className="text-base font-semibold text-stone-100">{label}</p>
        {hint && <p className="text-sm text-stone-400 mt-0.5">{hint}</p>}
      </div>
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Conditional reveal                                      */
/* ────────────────────────────────────────────────────────── */
export function Reveal({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-3 flex flex-col gap-3">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Textarea                                                */
/* ────────────────────────────────────────────────────────── */
interface TextareaProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border bg-stone-900 text-stone-100 placeholder-stone-500 outline-none transition-all duration-200 resize-none text-right leading-relaxed"
        style={{ borderColor: isFocused ? "#84cc16" : "#44403c" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {/* Focus underline animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full mx-4"
        animate={{
          scaleX: isFocused ? 1 : 0,
          opacity: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ background: "#84cc16" }}
      />
    </div>
  );
}
