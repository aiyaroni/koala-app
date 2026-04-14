"use client";

import { EmploymentData } from "./types";
import {
  Question,
  TextInput,
  PillRadio,
  SelectInput,
  Toggle,
  Reveal,
} from "./ui";

interface Props {
  data: EmploymentData;
  onChange: (data: EmploymentData) => void;
}

export default function StepEmployment({ data, onChange }: Props) {
  const update = <K extends keyof EmploymentData>(
    key: K,
    value: EmploymentData[K]
  ) => onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-stone-100">תעסוקה והכנסה 💼</h2>
        <p className="text-stone-400 mt-1 text-sm">
          נבין מה המצב שלך בעולם העבודה
        </p>
      </div>

      {/* Employment type */}
      <Question label="מה סוג התעסוקה שלך?">
        <PillRadio
          options={[
            { value: "employee", label: "שכיר/ה", emoji: "🏢" },
            { value: "self-employed", label: "עצמאי/ת", emoji: "🚀" },
            { value: "both", label: "שילוב", emoji: "⚡" },
          ]}
          value={data.employmentType}
          onChange={(v) =>
            update("employmentType", v as EmploymentData["employmentType"])
          }
        />
      </Question>

      {/* Gross salary */}
      <Question
        label="מה השכר ברוטו החודשי שלך?"
        hint="השכר לפני ניכוי מסים"
      >
        <TextInput
          type="number"
          value={data.grossSalary}
          onChange={(v) => update("grossSalary", v)}
          placeholder="למשל: 15,000"
          suffix="₪"
        />
      </Question>

      {/* Additional income */}
      <Question label="יש לך הכנסה נוספת מחוץ למשכורת?">
        <Toggle
          checked={data.hasAdditionalIncome}
          onChange={(v) => update("hasAdditionalIncome", v)}
          label="כן, יש לי הכנסה נוספת"
          sublabel="שכר דירה, פרילנס, דיבידנדים..."
        />
        <Reveal show={data.hasAdditionalIncome}>
          <Question label="כמה בחודש בממוצע?">
            <TextInput
              type="number"
              value={data.additionalIncome}
              onChange={(v) => update("additionalIncome", v)}
              placeholder="למשל: 3,000"
              suffix="₪"
            />
          </Question>
        </Reveal>
      </Question>

      {/* Years at employer */}
      <Question label="כמה שנים אתה בתפקיד הנוכחי?">
        <TextInput
          type="number"
          value={data.yearsAtCurrentEmployer}
          onChange={(v) => update("yearsAtCurrentEmployer", v)}
          placeholder="למשל: 5"
          min="0"
          max="50"
          suffix="שנים"
        />
      </Question>

      {/* Planned retirement age */}
      <Question label="מתי אתה מתכנן לצאת לפנסיה?">
        <SelectInput
          value={data.plannedRetirementAge}
          onChange={(v) =>
            update(
              "plannedRetirementAge",
              v as EmploymentData["plannedRetirementAge"]
            )
          }
          placeholder="בחר/י גיל פרישה מתוכנן..."
          options={[
            { value: "60", label: "גיל 60 (פרישה מוקדמת)" },
            { value: "62", label: "גיל 62" },
            { value: "65", label: "גיל 65 (סטנדרטי)" },
            { value: "67", label: "גיל 67 (פרישה חוקית)" },
            { value: "flexible", label: "עדיין לא החלטתי" },
          ]}
        />
      </Question>
    </div>
  );
}
