"use client";

import { GoalsData } from "./types";
import { Question, Textarea, PillRadio, SelectInput } from "./ui";
import { motion } from "framer-motion";

interface Props {
  data: GoalsData;
  onChange: (data: GoalsData) => void;
}

export default function StepGoals({ data, onChange }: Props) {
  const update = <K extends keyof GoalsData>(key: K, value: GoalsData[K]) =>
    onChange({ ...data, [key]: value });

  const riskLabels: Record<number, string> = {
    1: "שמרן מאוד",
    2: "שמרן",
    3: "שמרן-בינוני",
    4: "בינוני-שמרן",
    5: "בינוני",
    6: "בינוני-אגרסיבי",
    7: "אגרסיבי-בינוני",
    8: "אגרסיבי",
    9: "אגרסיבי מאוד",
    10: "ספקולנט",
  };

  const riskColors: Record<number, string> = {
    1: "#22c55e",
    2: "#4ade80",
    3: "#84cc16",
    4: "#a3e635",
    5: "#facc15",
    6: "#fb923c",
    7: "#f97316",
    8: "#ef4444",
    9: "#dc2626",
    10: "#d946ef",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-stone-100">מטרות וסובלנות סיכון 🎯</h2>
        <p className="text-stone-400 mt-1 text-sm">
          החלק הכי חשוב — מה באמת מטריד אותך ולאן רוצים להגיע
        </p>
      </div>

      {/* Biggest concern */}
      <Question
        label="מה הדבר הכי מטריד אותך פיננסית?"
        hint="ספר/י בחופשיות — אין תשובה נכונה או לא נכונה"
      >
        <Textarea
          value={data.biggestFinancialConcern}
          onChange={(v) => update("biggestFinancialConcern", v)}
          placeholder="למשל: &quot;אני דואג שלא יהיה לי מספיק כסף לפנסיה&quot;, &quot;המשכנתא כבדה עלי&quot;, &quot;לא מבין מה קורה עם הכסף שלי&quot;..."
          rows={4}
        />
      </Question>

      {/* Family if can't work */}
      <Question
        label="מה יקרה למשפחתך אם לא תוכל/י לעבוד מחר?"
        hint="כדאי לחשוב בכנות על המצב הכלכלי של המשפחה"
      >
        <PillRadio
          options={[
            { value: "fine", label: "בסדר גמור", emoji: "😌" },
            { value: "problematic", label: "קצת בעייתי", emoji: "😟" },
            { value: "catastrophe", label: "קטסטרופה", emoji: "😱" },
          ]}
          value={data.familyIfCantWork}
          onChange={(v) =>
            update("familyIfCantWork", v as GoalsData["familyIfCantWork"])
          }
        />
      </Question>

      {/* Months without income */}
      <Question label="כמה זמן המשפחה שלך יכולה להסתדר ללא הכנסתך?">
        <SelectInput
          value={data.monthsWithoutIncome}
          onChange={(v) =>
            update("monthsWithoutIncome", v as GoalsData["monthsWithoutIncome"])
          }
          placeholder="בחר/י..."
          options={[
            { value: "less-3", label: "פחות מ-3 חודשים" },
            { value: "3-6", label: "3 עד 6 חודשים" },
            { value: "6-12", label: "6 חודשים עד שנה" },
            { value: "more-12", label: "יותר משנה" },
          ]}
        />
      </Question>

      {/* Risk tolerance slider */}
      <Question
        label="מה הסובלנות שלך לסיכון בחיסכון?"
        hint="1 = שמרן מאוד, 10 = מוכן/ה לסיכון גבוה"
      >
        <div className="flex flex-col gap-3">
          {/* Value display — dir=ltr so slider goes left(1)→right(10) */}
          <div className="flex flex-col items-center gap-1 mb-1">
            <motion.div
              key={data.riskTolerance}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center"
            >
              <span
                className="text-3xl font-bold"
                style={{ color: riskColors[data.riskTolerance] }}
              >
                {data.riskTolerance}
              </span>
              <span
                className="text-xs mt-0.5"
                style={{ color: riskColors[data.riskTolerance] }}
              >
                {riskLabels[data.riskTolerance]}
              </span>
            </motion.div>
          </div>

          {/* Slider — explicit dir=ltr so min=right, max=left (matches RTL layout) */}
          <div className="px-1" dir="ltr">
            <div className="flex items-center justify-between mb-1 text-sm text-stone-400">
              <span>שמרן מאוד 🐢</span>
              <span>אגרסיבי 🚀</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={data.riskTolerance}
              onChange={(e) => update("riskTolerance", Number(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(to right, ${riskColors[data.riskTolerance]} 0%, ${riskColors[data.riskTolerance]} ${(data.riskTolerance - 1) / 9 * 100}%, #44403c ${(data.riskTolerance - 1) / 9 * 100}%, #44403c 100%)`,
              }}
            />
          </div>

          {/* Scale markers */}
          <div className="flex justify-between px-0.5" dir="ltr">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <span
                key={n}
                className="text-xs"
                style={{
                  color: n <= data.riskTolerance ? riskColors[data.riskTolerance] : "#57534e",
                  fontWeight: n === data.riskTolerance ? 700 : 400,
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </Question>
    </div>
  );
}
