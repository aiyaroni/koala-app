"use client";

import { useState, useRef, useCallback } from "react";
import { DocumentsData, DocumentFile } from "./types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data: DocumentsData;
  onChange: (data: DocumentsData) => void;
}

interface DocZoneProps {
  label: string;
  description: string;
  hint: string;
  link?: { url: string; label: string };
  required?: boolean;
  file: DocumentFile | null;
  onFile: (f: DocumentFile | null) => void;
  docType: DocumentFile["type"];
}

function DocZone({
  label,
  description,
  hint,
  link,
  required,
  file,
  onFile,
  docType,
}: DocZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (f: File) => {
      onFile({
        id: Math.random().toString(36).slice(2),
        name: f.name,
        file: f,
        type: docType,
      });
    },
    [onFile, docType]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold text-stone-100">{label}</p>
        {required && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(217,70,239,0.15)", color: "#d946ef" }}
          >
            חובה
          </span>
        )}
      </div>
      <p className="text-sm text-stone-400">{description}</p>

      {/* Drop zone */}
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        animate={{
          borderColor: isDragging
            ? "#84cc16"
            : file
            ? "#84cc16"
            : "#44403c",
          background: isDragging
            ? "rgba(132,204,22,0.05)"
            : file
            ? "rgba(132,204,22,0.05)"
            : "rgba(41,37,36,0.3)",
        }}
        className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 min-h-[120px]"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(132,204,22,0.15)" }}
              >
                ✅
              </div>
              <p className="text-sm font-medium" style={{ color: "#84cc16" }}>
                {file.name}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFile(null);
                }}
                className="text-xs text-stone-500 hover:text-stone-300 transition-colors underline"
              >
                הסר קובץ
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(41,37,36,0.8)" }}
              >
                {isDragging ? "📥" : "📎"}
              </div>
              <p className="text-sm text-stone-400">
                {isDragging
                  ? "שחרר לכאן..."
                  : "גרור קובץ לכאן או לחץ לבחירה"}
              </p>
              <p className="text-xs text-stone-600">PDF, JPG, PNG</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hint + link */}
      <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: "rgba(41,37,36,0.5)" }}>
        <span className="text-base mt-0.5">💡</span>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-stone-300">{hint}</p>
          {link && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: "#84cc16" }}
              onClick={(e) => e.stopPropagation()}
            >
              {link.label} ←
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StepDocuments({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-stone-100">העלאת מסמכים 📄</h2>
        <p className="text-stone-400 mt-1 text-sm">
          המסמכים עוזרים לנו לתת לך תמונה מדויקת — אבל רק הדוח הפנסיוני הוא חובה
        </p>
      </div>

      {/* Pension report - required */}
      <DocZone
        label="דוח מסלקה פנסיונית"
        description="מסמך אחד שמרכז את כל הפנסיות, ביטוחי המנהלים וקרנות ההשתלמות שלך"
        hint='הורד מאתר מסלקת הפנסיה — פשוט גוגל "מסלקה פנסיונית" והתחבר עם אפליקציית הבנק שלך'
        link={{
          url: "https://www.meslaka.co.il",
          label: "לאתר המסלקה הפנסיונית",
        }}
        required
        docType="pension-report"
        file={data.pensionReport}
        onFile={(f) => onChange({ ...data, pensionReport: f })}
      />

      {/* Insurance policies - optional */}
      <DocZone
        label="פוליסות ביטוח"
        description="פוליסת ביטוח חיים, אובדן כושר עבודה, ביטוח דירה — מה שיש לך"
        hint="ניתן למצוא את הפוליסות דרך האזור האישי באתר חברת הביטוח"
        docType="insurance-policy"
        file={data.insurancePolicies[0] ?? null}
        onFile={(f) =>
          onChange({
            ...data,
            insurancePolicies: f ? [f] : [],
          })
        }
      />

      {/* Payslip - optional */}
      <DocZone
        label="תלוש שכר אחרון"
        description="עוזר לנו לאמת את נתוני ההכנסה והניכויים"
        hint="תלוש השכר האחרון שקיבלת — בדרך כלל נשלח במייל או דרך מערכת השכר של המעסיק"
        docType="payslip"
        file={data.payslips[0] ?? null}
        onFile={(f) =>
          onChange({
            ...data,
            payslips: f ? [f] : [],
          })
        }
      />

      {/* Privacy note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-start gap-3 p-4 rounded-2xl"
        style={{ background: "rgba(132,204,22,0.05)", border: "1px solid rgba(132,204,22,0.15)" }}
      >
        <span className="text-xl">🔒</span>
        <div>
          <p className="text-sm font-semibold text-stone-200">הנתונים שלך מוגנים</p>
          <p className="text-sm text-stone-400 mt-0.5 leading-relaxed">
            המסמכים מועלים בצורה מוצפנת ומשמשים אך ורק לניתוח ייעוץ אישי. אנחנו לא שומרים
            מסמכים לאחר סיום הניתוח.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
