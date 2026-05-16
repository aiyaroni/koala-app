"use client";

import { InsuranceData } from "./types";
import { Question, TextInput, Toggle, PillRadio, SelectInput, Reveal } from "./ui";

interface Props {
  data: InsuranceData;
  onChange: (data: InsuranceData) => void;
  serviceId?: string;
}

export default function StepInsurance({ data, onChange, serviceId = "default" }: Props) {
  const update = <K extends keyof InsuranceData>(
    key: K,
    value: InsuranceData[K]
  ) => onChange({ ...data, [key]: value });

  const isCarOnly = serviceId === "car-insurance";

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        {isCarOnly ? (
          <>
            <h2 className="text-2xl font-bold text-stone-100">ביטוח רכב 🚗</h2>
            <p className="text-stone-400 mt-1 text-sm">
              פרטי הרכב והנהג כדי שנוכל לבדוק עבורך את הכיסוי הטוב ביותר
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-stone-100">ביטוחים 🛡️</h2>
            <p className="text-stone-400 mt-1 text-sm">
              נוודא שיש לך כיסוי למצבים שעדיף לא לחשוב עליהם
            </p>
          </>
        )}
      </div>

      {/* ── Car-only questions ── */}
      {isCarOnly && (
        <>
          <Question label="שנת ייצור הרכב?" hint="חובה">
            <TextInput
              type="number"
              value={data.vehicleYear}
              onChange={(v) => update("vehicleYear", v)}
              placeholder="למשל: 2019"
              min="1990"
              max="2026"
            />
          </Question>

          <Question label="יצרן הרכב?" hint="חובה">
            <SelectInput
              value={data.vehicleMake}
              onChange={(v) => update("vehicleMake", v)}
              placeholder="בחר/י יצרן..."
              options={[
                { value: "toyota", label: "Toyota" },
                { value: "hyundai", label: "Hyundai" },
                { value: "kia", label: "Kia" },
                { value: "mazda", label: "Mazda" },
                { value: "honda", label: "Honda" },
                { value: "ford", label: "Ford" },
                { value: "volkswagen", label: "Volkswagen" },
                { value: "skoda", label: "Skoda" },
                { value: "seat", label: "SEAT" },
                { value: "renault", label: "Renault" },
                { value: "peugeot", label: "Peugeot" },
                { value: "citroen", label: "Citroën" },
                { value: "nissan", label: "Nissan" },
                { value: "mitsubishi", label: "Mitsubishi" },
                { value: "subaru", label: "Subaru" },
                { value: "tesla", label: "Tesla" },
                { value: "other", label: "אחר" },
              ]}
            />
          </Question>

          <Question label="כמה שנים אתה נוהג/ת?" hint="ניסיון נהיגה">
            <TextInput
              type="number"
              value={data.drivingYears}
              onChange={(v) => update("drivingYears", v)}
              placeholder="למשל: 5"
              suffix="שנים"
              min="0"
              max="60"
            />
          </Question>

          <Question label="כמה ק״מ אתה נוסע/ת בשנה בממוצע?">
            <PillRadio
              options={[
                { value: "under-10k", label: "עד 10,000", emoji: "🐢" },
                { value: "10k-20k", label: "10–20 אלף", emoji: "🚗" },
                { value: "20k-30k", label: "20–30 אלף", emoji: "🏎️" },
                { value: "over-30k", label: "מעל 30 אלף", emoji: "✈️" },
              ]}
              value={data.annualKm}
              onChange={(v) => update("annualKm", v as InsuranceData["annualKm"])}
            />
          </Question>

          <Question label="כמה תאונות היו לך ב-3 השנים האחרונות?">
            <PillRadio
              options={[
                { value: "none", label: "אפס", emoji: "✅" },
                { value: "one", label: "אחת", emoji: "⚠️" },
                { value: "two-plus", label: "שתיים ומעלה", emoji: "❗" },
              ]}
              value={data.previousAccidents}
              onChange={(v) => update("previousAccidents", v as InsuranceData["previousAccidents"])}
            />
          </Question>
        </>
      )}

      {/* ── Car insurance type (shown for all) ── */}
      <Question label={isCarOnly ? "איזה ביטוח רכב יש לך כרגע?" : "איזה ביטוח רכב יש לך?"} hint="חובה">
        <SelectInput
          value={data.carInsurance}
          onChange={(v) =>
            update("carInsurance", v as InsuranceData["carInsurance"])
          }
          placeholder="בחר/י סוג ביטוח..."
          options={[
            { value: "mandatory", label: "חובה בלבד" },
            { value: "third-party", label: "צד שלישי" },
            { value: "comprehensive", label: "מקיף" },
          ]}
        />
      </Question>

      {/* ── Full insurance questions (not for car-only) ── */}
      {!isCarOnly && (
        <>
          {/* Life insurance */}
          <Question
            label="יש לך ביטוח חיים פרטי?"
            hint="לא כולל את זה שבפנסיה"
          >
            <Toggle
              checked={data.hasLifeInsurance}
              onChange={(v) => update("hasLifeInsurance", v)}
              label="כן, יש לי ביטוח חיים"
            />
            <Reveal show={data.hasLifeInsurance}>
              <Question label="מה סכום הביטוח?">
                <TextInput
                  type="number"
                  value={data.lifeInsuranceAmount}
                  onChange={(v) => update("lifeInsuranceAmount", v)}
                  placeholder="למשל: 1,000,000"
                  suffix="₪"
                />
              </Question>
              <Question label="באיזו חברה?">
                <TextInput
                  value={data.lifeInsuranceCompany}
                  onChange={(v) => update("lifeInsuranceCompany", v)}
                  placeholder="למשל: הראל, מגדל, הפניקס..."
                />
              </Question>
            </Reveal>
          </Question>

          {/* Disability insurance */}
          <Question
            label="יש לך ביטוח אובדן כושר עבודה?"
            hint="אחד הביטוחים החשובים ביותר"
          >
            <Toggle
              checked={data.hasDisabilityInsurance}
              onChange={(v) => update("hasDisabilityInsurance", v)}
              label="כן, יש לי ביטוח א.כ.ע"
            />
            <Reveal show={data.hasDisabilityInsurance}>
              <Question label="כמה אחוז מהשכר מכוסה?">
                <TextInput
                  type="number"
                  value={data.disabilityInsurancePercent}
                  onChange={(v) => update("disabilityInsurancePercent", v)}
                  placeholder="למשל: 75"
                  suffix="%"
                />
              </Question>
            </Reveal>
          </Question>

          {/* Home insurance */}
          <Question label="יש לך ביטוח דירה?">
            <Toggle
              checked={data.hasHomeInsurance}
              onChange={(v) => update("hasHomeInsurance", v)}
              label="כן, יש לי ביטוח דירה"
            />
            <Reveal show={data.hasHomeInsurance}>
              <Question label="מה מכוסה?">
                <PillRadio
                  options={[
                    { value: "structure", label: "מבנה בלבד", emoji: "🏗️" },
                    { value: "contents", label: "תוכן בלבד", emoji: "📦" },
                    { value: "both", label: "מבנה + תוכן", emoji: "✨" },
                  ]}
                  value={data.homeInsuranceType}
                  onChange={(v) =>
                    update(
                      "homeInsuranceType",
                      v as InsuranceData["homeInsuranceType"]
                    )
                  }
                />
              </Question>
            </Reveal>
          </Question>

          {/* Supplemental health */}
          <Question label="יש לך ביטוח משלים בריאות?">
            <Toggle
              checked={data.hasHealthInsurance}
              onChange={(v) => update("hasHealthInsurance", v)}
              label="כן, יש לי ביטוח בריאות פרטי/משלים"
              sublabel="שב״ן, ביטוח שיניים, השלמות..."
            />
            <Reveal show={data.hasHealthInsurance}>
              <Question label="באיזו קופת חולים אתה?">
                <PillRadio
                  options={[
                    { value: "maccabi", label: "מכבי" },
                    { value: "clalit", label: "כללית" },
                    { value: "meuhedet", label: "מאוחדת" },
                    { value: "leumit", label: "לאומית" },
                  ]}
                  value={data.healthInsuranceHmo}
                  onChange={(v) => update("healthInsuranceHmo", v)}
                />
              </Question>
              <Question label="מה רמת הכיסוי?">
                <PillRadio
                  options={[
                    { value: "basic", label: "בסיסי" },
                    { value: "gold", label: "זהב" },
                    { value: "platinum", label: "פלטינום" },
                  ]}
                  value={data.healthInsuranceLevel}
                  onChange={(v) => update("healthInsuranceLevel", v)}
                />
              </Question>
            </Reveal>
          </Question>
        </>
      )}
    </div>
  );
}
