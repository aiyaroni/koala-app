"use client";

import { TaxTriggersData } from "./types";
import { Question, TextInput, Toggle, PillRadio, SelectInput, Reveal } from "./ui";

interface Props {
  data: TaxTriggersData;
  onChange: (data: TaxTriggersData) => void;
}

const TAX_YEARS = ["2025", "2024", "2023", "2022", "2021", "2020"];

const YISHUVIM_MEZAKIM = [
  { value: "kiryat-shmona", label: "קריית שמונה" },
  { value: "eilat", label: "אילת" },
  { value: "sderot", label: "שדרות" },
  { value: "dimona", label: "דימונה" },
  { value: "metula", label: "מטולה" },
  { value: "yeruham", label: "ירוחם" },
  { value: "mitzpe-ramon", label: "מצפה רמון" },
  { value: "ofakim", label: "אופקים" },
  { value: "netivot", label: "נתיבות" },
  { value: "beit-shean", label: "בית שאן" },
  { value: "other", label: "יישוב אחר ברשימה" },
];

export default function StepTaxTriggers({ data, onChange }: Props) {
  const update = <K extends keyof TaxTriggersData>(
    key: K,
    value: TaxTriggersData[K]
  ) => onChange({ ...data, [key]: value });

  const toggleYear = (year: string) => {
    const next = data.taxYears.includes(year)
      ? data.taxYears.filter((y) => y !== year)
      : [...data.taxYears, year];
    update("taxYears", next);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-stone-100">טריגרים להחזר מס 💸</h2>
        <p className="text-stone-400 mt-1 text-sm">
          נזהה אילו אירועים בחיים שלך זכאים להחזר מס מהמדינה
        </p>
      </div>

      {/* Tax years multi-select */}
      <Question
        label="לאילו שנות מס לבדוק החזר?"
        hint="ניתן לדרוש החזר עד 6 שנים אחורה (סעיף 160)"
      >
        <div className="flex flex-wrap gap-2">
          {TAX_YEARS.map((year) => {
            const selected = data.taxYears.includes(year);
            return (
              <button
                key={year}
                type="button"
                onClick={() => toggleYear(year)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
                style={{
                  background: selected ? "#facc15" : "transparent",
                  color: selected ? "#1c1917" : "#a8a29e",
                  borderColor: selected ? "#facc15" : "#44403c",
                }}
              >
                {year}
              </button>
            );
          })}
        </div>
      </Question>

      {/* Job changes */}
      <Question
        label="החלפת עבודה באמצע שנה?"
        hint="מעסיק חדש לא יודע על ההכנסות מהמעסיק הקודם"
      >
        <Toggle
          checked={data.jobChanges}
          onChange={(v) => update("jobChanges", v)}
          label="כן, החלפתי עבודה ב-12 חודשים אחרונים"
        />
        <Reveal show={data.jobChanges}>
          <Question label="כמה מעסיקים היו לי בשנה?">
            <PillRadio
              options={[
                { value: "2", label: "2 מעסיקים", emoji: "👥" },
                { value: "3", label: "3 מעסיקים", emoji: "👥" },
                { value: "4+", label: "4 ומעלה", emoji: "👥" },
              ]}
              value={data.employersCount}
              onChange={(v) =>
                update("employersCount", v as TaxTriggersData["employersCount"])
              }
            />
          </Question>
        </Reveal>
      </Question>

      {/* Unemployment / maternity / unpaid leave */}
      <Question
        label="הייתה תקופת אבטלה / חופשת לידה / חל״ת?"
        hint="הכנסה נמוכה מהמתוכנן בחלק מהשנה"
      >
        <Toggle
          checked={data.hadUnemployment}
          onChange={(v) => update("hadUnemployment", v)}
          label="כן, הייתה לי תקופה כזו"
        />
        <Reveal show={data.hadUnemployment}>
          <Question label="כמה חודשים בערך?">
            <TextInput
              type="number"
              value={data.unemploymentMonths}
              onChange={(v) => update("unemploymentMonths", v)}
              placeholder="למשל: 4"
              suffix="חודשים"
              min="1"
              max="12"
            />
          </Question>
        </Reveal>
      </Question>

      {/* Miluim */}
      <Question
        label="ימי מילואים ב-12 חודשים אחרונים?"
        hint="מ-30 ימים מתחיל לקבל נקודות זיכוי נוספות לפי סעיף 39ב"
      >
        <TextInput
          type="number"
          value={data.miluimDays}
          onChange={(v) => update("miluimDays", v)}
          placeholder="למשל: 35"
          suffix="ימים"
          min="0"
          max="365"
        />
      </Question>

      {/* Section 46 donations */}
      <Question
        label="תרמת לעמותה מוכרת (סעיף 46)?"
        hint="35% החזר מס על תרומות לעמותות בעלות אישור סעיף 46"
      >
        <Toggle
          checked={data.hadDonations}
          onChange={(v) => update("hadDonations", v)}
          label="כן, תרמתי לעמותה מוכרת"
        />
        <Reveal show={data.hadDonations}>
          <Question label="סכום התרומות השנתי?">
            <TextInput
              type="number"
              value={data.donationsAmount}
              onChange={(v) => update("donationsAmount", v)}
              placeholder="למשל: 2,000"
              suffix="₪"
              min="207"
            />
          </Question>
        </Reveal>
      </Question>

      {/* Yishuv mezakeh */}
      <Question
        label="אתה תושב יישוב מזכה?"
        hint="יישובים מסוימים מזכים באחוז זיכוי מהכנסה"
      >
        <Toggle
          checked={data.yishuvMezakeh}
          onChange={(v) => update("yishuvMezakeh", v)}
          label="כן, אני גר ביישוב מזכה"
        />
        <Reveal show={data.yishuvMezakeh}>
          <Question label="באיזה יישוב?">
            <SelectInput
              value={data.yishuvName}
              onChange={(v) => update("yishuvName", v)}
              placeholder="בחר/י יישוב..."
              options={YISHUVIM_MEZAKIM}
            />
          </Question>
        </Reveal>
      </Question>

      {/* Missed credit points */}
      <Question
        label="נקודות זיכוי שאולי לא נדרשו"
        hint="ניתן לסמן יותר מאחת"
      >
        <div className="flex flex-col gap-3">
          <Toggle
            checked={data.isNewImmigrantClaim}
            onChange={(v) => update("isNewImmigrantClaim", v)}
            label="עולה חדש / תושב חוזר"
            sublabel="5 שנים ראשונות בארץ — נקודות זיכוי מיוחדות"
          />
          <Toggle
            checked={data.isSingleParent}
            onChange={(v) => update("isSingleParent", v)}
            label="חד-הורי"
            sublabel="נקודות זיכוי נוספות לפי סעיף 40"
          />
          <Toggle
            checked={data.hasDisabledChild}
            onChange={(v) => update("hasDisabledChild", v)}
            label="ילד עם נכות"
            sublabel="2 נקודות זיכוי נוספות"
          />
        </div>
      </Question>

      {/* Special situations */}
      <Question
        label="מצבים מיוחדים נוספים"
        hint="כל אחד מאלה יכול להגדיל את ההחזר"
      >
        <div className="flex flex-col gap-3">
          <Toggle
            checked={data.hasPersonalDisability}
            onChange={(v) => update("hasPersonalDisability", v)}
            label="נכות אישית מוכרת"
            sublabel="פטור ממס לפי סעיף 9(5)"
          />
          <Toggle
            checked={data.paysAlimony}
            onChange={(v) => update("paysAlimony", v)}
            label="משלם מזונות"
            sublabel="ניכוי לפי סעיף 17"
          />
          <Toggle
            checked={data.earlyKerenWithdrawal}
            onChange={(v) => update("earlyKerenWithdrawal", v)}
            label="משכתי קרן השתלמות מוקדם"
            sublabel="ניתן לדרוש פטור על חלק מהסכום"
          />
        </div>
      </Question>
    </div>
  );
}
