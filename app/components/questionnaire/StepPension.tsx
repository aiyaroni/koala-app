"use client";

import { PensionData } from "./types";
import { Question, TextInput, Toggle, PillRadio, Reveal } from "./ui";

interface Props {
  data: PensionData;
  onChange: (data: PensionData) => void;
}

export default function StepPension({ data, onChange }: Props) {
  const update = <K extends keyof PensionData>(key: K, value: PensionData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-stone-100">מצב פנסיוני 🏦</h2>
        <p className="text-stone-400 mt-1 text-sm">
          נבדוק יחד מה מחכה לך בגיל הפרישה
        </p>
      </div>

      {/* Pension fund */}
      <Question label="יש לך קרן פנסיה?">
        <Toggle
          checked={data.hasPensionFund}
          onChange={(v) => update("hasPensionFund", v)}
          label="כן, יש לי קרן פנסיה"
          sublabel="הסוג הנפוץ ביותר בישראל"
        />
        <Reveal show={data.hasPensionFund}>
          <Question label="באיזו קרן?">
            <TextInput
              value={data.pensionFundName}
              onChange={(v) => update("pensionFundName", v)}
              placeholder="למשל: מיטב, הראל, מגדל, כלל..."
            />
          </Question>
        </Reveal>
      </Question>

      {/* Manager insurance */}
      <Question label="יש לך ביטוח מנהלים?">
        <Toggle
          checked={data.hasManagerInsurance}
          onChange={(v) => update("hasManagerInsurance", v)}
          label="כן, יש לי ביטוח מנהלים"
          sublabel="פוליסת ביטוח חיסכון ישנה יותר"
        />
        <Reveal show={data.hasManagerInsurance}>
          <Question label="באיזו חברה?">
            <TextInput
              value={data.managerInsuranceCompany}
              onChange={(v) => update("managerInsuranceCompany", v)}
              placeholder="למשל: הראל, מגדל, כלל, הפניקס..."
            />
          </Question>
        </Reveal>
      </Question>

      {/* Study fund */}
      <Question label="יש לך קרן השתלמות?">
        <Toggle
          checked={data.hasStudyFund}
          onChange={(v) => update("hasStudyFund", v)}
          label="כן, יש לי קרן השתלמות"
          sublabel="כלי חיסכון עם הטבות מס ייחודיות"
        />
      </Question>

      {/* Provident fund */}
      <Question label="יש לך קופת גמל?">
        <Toggle
          checked={data.hasProvidentFund}
          onChange={(v) => update("hasProvidentFund", v)}
          label="כן, יש לי קופת גמל"
        />
      </Question>

      {/* Employer contributions */}
      <Question
        label="המעסיק שלך מפריש לך לפנסיה?"
        hint="לפי חוק, כל מעסיק חייב להפריש"
      >
        <PillRadio
          options={[
            { value: "yes", label: "כן, מפריש", emoji: "✅" },
            { value: "no", label: "לא מפריש", emoji: "❌" },
            { value: "unknown", label: "לא יודע/ת", emoji: "🤷" },
          ]}
          value={data.employerContributes}
          onChange={(v) =>
            update("employerContributes", v as PensionData["employerContributes"])
          }
        />
      </Question>

      {/* Management fees */}
      <Question label="יש לך מושג כמה אתה משלם דמי ניהול?">
        <Toggle
          checked={data.knowsManagementFees}
          onChange={(v) => update("knowsManagementFees", v)}
          label="כן, אני יודע"
          sublabel="דמי ניהול גבוהים יכולים לאכול חלק גדול מהפנסיה שלך"
        />
        <Reveal show={data.knowsManagementFees}>
          <Question label="כמה אחוז דמי ניהול?">
            <TextInput
              type="number"
              value={data.managementFeesPercent}
              onChange={(v) => update("managementFeesPercent", v)}
              placeholder="למשל: 0.5"
              suffix="%"
            />
          </Question>
        </Reveal>
      </Question>

      {/* Current balance */}
      <Question
        label="מה היתרה המצטברת שלך בקרן? (משוערת)"
        hint="אופציונלי — ניתן לדלג"
      >
        <TextInput
          type="number"
          value={data.currentBalance}
          onChange={(v) => update("currentBalance", v)}
          placeholder="למשל: 250,000"
          suffix="₪"
        />
      </Question>

      {/* Investment track */}
      <Question
        label="באיזה מסלול השקעה אתה?"
        hint="ניתן לבדוק בדוח הפנסיה שלך"
      >
        <PillRadio
          options={[
            { value: "conservative", label: "שמרני", emoji: "🛡️" },
            { value: "balanced", label: "מאוזן", emoji: "⚖️" },
            { value: "aggressive", label: "מנייתי", emoji: "📈" },
            { value: "unknown", label: "לא יודע/ת", emoji: "🤷" },
          ]}
          value={data.investmentTrack}
          onChange={(v) =>
            update("investmentTrack", v as PensionData["investmentTrack"])
          }
        />
      </Question>
    </div>
  );
}
