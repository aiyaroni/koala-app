"use client";

import { useState, useRef, useCallback } from "react";
import { DocumentsData, DocumentFile } from "./types";
import { motion, AnimatePresence } from "framer-motion";

const MAX_FILES = 3;

interface Props {
  data: DocumentsData;
  onChange: (data: DocumentsData) => void;
  serviceId?: string;
}

interface DocZoneProps {
  label: string;
  description: string;
  hint: string;
  link?: { url: string; label: string };
  required?: boolean;
  files: DocumentFile[];
  maxFiles?: number;
  onFiles: (files: DocumentFile[]) => void;
  docType: DocumentFile["type"];
}

function DocZone({ label, description, hint, link, required, files, maxFiles = MAX_FILES, onFiles, docType }: DocZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFile = useCallback(
    (f: File) => {
      if (files.length >= maxFiles) return;
      const newFile: DocumentFile = {
        id: Math.random().toString(36).slice(2),
        name: f.name,
        file: f,
        type: docType,
      };
      onFiles([...files, newFile]);
    },
    [files, maxFiles, onFiles, docType]
  );

  const removeFile = (id: string) => onFiles(files.filter((f) => f.id !== id));

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      Array.from(e.dataTransfer.files).slice(0, maxFiles - files.length).forEach(addFile);
    },
    [addFile, files.length, maxFiles]
  );

  const canAdd = files.length < maxFiles;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold text-stone-100">{label}</p>
        {required && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(217,70,239,0.15)", color: "#d946ef" }}>
            חובה
          </span>
        )}
        <span className="text-xs text-stone-500 mr-auto">עד {maxFiles} קבצים</span>
      </div>
      <p className="text-sm text-stone-400">{description}</p>

      {/* Uploaded files list */}
      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl"
            style={{ background: "rgba(132,204,22,0.08)", border: "1px solid rgba(132,204,22,0.2)" }}
          >
            <button
              type="button"
              onClick={() => removeFile(file.id)}
              className="text-xs text-stone-500 hover:text-red-400 transition-colors"
            >
              הסר
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-200 text-right truncate max-w-[200px]">{file.name}</span>
              <span className="text-base">✅</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Drop zone — only shown when can add more */}
      {canAdd && (
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          animate={{
            borderColor: isDragging ? "#84cc16" : "#44403c",
            background: isDragging ? "rgba(132,204,22,0.05)" : "rgba(41,37,36,0.3)",
          }}
          className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed cursor-pointer min-h-[100px]"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={(e) => {
              Array.from(e.target.files ?? []).slice(0, maxFiles - files.length).forEach(addFile);
              e.target.value = "";
            }}
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(41,37,36,0.8)" }}>
              {isDragging ? "📥" : "📎"}
            </div>
            <p className="text-sm text-stone-400">
              {isDragging ? "שחרר לכאן..." : files.length === 0 ? "גרור קובץ לכאן או לחץ לבחירה" : "הוסף קובץ נוסף"}
            </p>
            <p className="text-xs text-stone-600">PDF, JPG, PNG • נותרו {maxFiles - files.length} מתוך {maxFiles}</p>
          </div>
        </motion.div>
      )}

      {/* Hint */}
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
            >
              {link.label} ←
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StepDocuments({ data, onChange, serviceId }: Props) {
  const isPension = !serviceId || serviceId === "pension" || serviceId === "default";
  const isInsurance = serviceId === "insurance";
  const isTaxRefund = serviceId === "tax-refund";

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-stone-100">העלאת מסמכים 📄</h2>
        <p className="text-stone-400 mt-1 text-sm">
          המסמכים עוזרים לנו לתת לך תמונה מדויקת יותר. הכל אופציונלי
        </p>
      </div>

      {/* Pension report — for pension service */}
      {isPension && (
        <DocZone
          label="דוח מסלקה פנסיונית"
          description="מסמך אחד שמרכז את כל הפנסיות, ביטוחי המנהלים וקרנות ההשתלמות שלך"
          hint='הורד מאתר מסלקת הפנסיה. גוגל "מסלקה פנסיונית" והתחבר עם אפליקציית הבנק שלך'
          link={{ url: "https://www.meslaka.co.il", label: "לאתר המסלקה הפנסיונית" }}
          maxFiles={1}
          docType="pension-report"
          files={data.pensionReport ? [data.pensionReport] : []}
          onFiles={(files) => onChange({ ...data, pensionReport: files[0] ?? null })}
        />
      )}

      {/* Form 106 — for tax refund */}
      {isTaxRefund && (
        <DocZone
          label="טופס 106"
          description="ריכוז שנתי של ההכנסות והניכויים מהמעסיק — שדה 042 קריטי לחישוב"
          hint='קבל ממדור השכר במקום העבודה. אם החלפת עבודה — תצטרך טופס 106 מכל מעסיק'
          link={{ url: "https://www.kolzchut.org.il/he/%D7%98%D7%95%D7%A4%D7%A1_106", label: "מידע על טופס 106 בכל זכות" }}
          maxFiles={3}
          docType="pension-report"
          files={data.pensionReport ? [data.pensionReport] : []}
          onFiles={(files) => onChange({ ...data, pensionReport: files[0] ?? null })}
        />
      )}

      {/* Insurance policies — not for tax refund */}
      {!isTaxRefund && (
        <DocZone
          label="פוליסות ביטוח"
          description="ביטוח חיים, אובדן כושר עבודה, ביטוח דירה. כל מה שיש לך"
          hint="תמצא את הפוליסות באזור האישי באתר חברת הביטוח"
          docType="insurance-policy"
          files={data.insurancePolicies}
          onFiles={(files) => onChange({ ...data, insurancePolicies: files })}
        />
      )}

      {/* Receipts/certificates — for tax refund */}
      {isTaxRefund && (
        <DocZone
          label="קבלות תרומות / אישורי מילואים"
          description="קבלות סעיף 46, אישורי שירות מילואים, אישורי תושב יישוב מזכה"
          hint="העלה כל מסמך תומך לטריגרים שסימנת בשלב הקודם"
          docType="insurance-policy"
          files={data.insurancePolicies}
          onFiles={(files) => onChange({ ...data, insurancePolicies: files })}
        />
      )}

      {/* Payslips — for pension / default / tax-refund */}
      {!isInsurance && (
        <DocZone
          label="תלושי שכר"
          description="עוזר לנו לאמת את נתוני ההכנסה והניכויים"
          hint="תלוש השכר האחרון. בדרך כלל נשלח במייל או דרך מערכת השכר"
          docType="payslip"
          files={data.payslips}
          onFiles={(files) => onChange({ ...data, payslips: files })}
        />
      )}

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
            המסמכים מועלים בצורה מוצפנת ומשמשים אך ורק לניתוח אישי. לא שומרים מסמכים לאחר סיום הניתוח.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
