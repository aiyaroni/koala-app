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
  serviceId?: string;
}

export default function StepEmployment({ data, onChange, serviceId = "default" }: Props) {
  const update = <K extends keyof EmploymentData>(
    key: K,
    value: EmploymentData[K]
  ) => onChange({ ...data, [key]: value });

  const isNetSalary = serviceId === "net-salary";

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

      {/* ── Net salary specific questions ── */}
      {isNetSalary && (
        <>
          <Question label="יש לך רכב חברה?">
            <Toggle
              checked={data.hasCompanyCar}
              onChange={(v) => update("hasCompanyCar", v)}
              label="כן, יש לי רכב חברה"
              sublabel="שווי שימוש מתווסף לשכר החייב במס"
            />
            <Reveal show={data.hasCompanyCar}>
              <Question label="מה שווי הרכב? (לפי מחירון)">
                <TextInput
                  type="number"
                  value={data.companyCarValue}
                  onChange={(v) => update("companyCarValue", v)}
                  placeholder="למשל: 120,000"
                  suffix="₪"
                />
              </Question>
            </Reveal>
          </Question>

          <Question label="אתה מקבל שוברי ארוחות?">
            <Toggle
              checked={data.hasMealVouchers}
              onChange={(v) => update("hasMealVouchers", v)}
              label="כן, יש לי שוברי ארוחות / קופת גמל לצרכן"
            />
            <Reveal show={data.hasMealVouchers}>
              <Question label="כמה בחודש?">
                <TextInput
                  type="number"
                  value={data.mealVouchersAmount}
                  onChange={(v) => update("mealVouchersAmount", v)}
                  placeholder="למשל: 400"
                  suffix="₪"
                />
              </Question>
            </Reveal>
          </Question>

          <Question
            label="כמה אחוז מהשכר אתה מפריש לפנסיה?"
            hint="חלק העובד (לא כולל חלק המעסיק)"
          >
            <TextInput
              type="number"
              value={data.pensionEmployeePercent}
              onChange={(v) => update("pensionEmployeePercent", v)}
              placeholder="למשל: 6"
              suffix="%"
              min="0"
              max="20"
            />
          </Question>
        </>
      )}
    </div>
  );
}
