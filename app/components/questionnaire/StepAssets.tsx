"use client";

import { AssetsData } from "./types";
import { Question, TextInput, Toggle, Reveal } from "./ui";

interface Props {
  data: AssetsData;
  onChange: (data: AssetsData) => void;
}

export default function StepAssets({ data, onChange }: Props) {
  const update = <K extends keyof AssetsData>(key: K, value: AssetsData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-stone-100">נכסים והתחייבויות 🏠</h2>
        <p className="text-stone-400 mt-1 text-sm">
          מה יש לך ומה החובות שלך — תמונה כוללת
        </p>
      </div>

      {/* Mortgage */}
      <Question label="יש לך משכנתא?">
        <Toggle
          checked={data.hasMortgage}
          onChange={(v) => update("hasMortgage", v)}
          label="כן, יש לי משכנתא"
          sublabel="הלוואה לרכישת נכס"
        />
        <Reveal show={data.hasMortgage}>
          <Question label="מה יתרת המשכנתא?">
            <TextInput
              type="number"
              value={data.mortgageBalance}
              onChange={(v) => update("mortgageBalance", v)}
              placeholder="למשל: 800,000"
              suffix="₪"
            />
          </Question>
          <Question label="מה הריבית הממוצעת?">
            <TextInput
              type="number"
              value={data.mortgageInterest}
              onChange={(v) => update("mortgageInterest", v)}
              placeholder="למשל: 4.5"
              suffix="%"
            />
          </Question>
          <Question label="כמה שנים נותרו למשכנתא?">
            <TextInput
              type="number"
              value={data.mortgageYearsLeft}
              onChange={(v) => update("mortgageYearsLeft", v)}
              placeholder="למשל: 20"
              suffix="שנים"
            />
          </Question>
        </Reveal>
      </Question>

      {/* Other loans */}
      <Question label="יש לך הלוואות אחרות?">
        <Toggle
          checked={data.hasOtherLoans}
          onChange={(v) => update("hasOtherLoans", v)}
          label="כן, יש לי הלוואות נוספות"
          sublabel="הלוואות בנקאיות, חוב כרטיס אשראי..."
        />
        <Reveal show={data.hasOtherLoans}>
          <Question label="מה סה״כ יתרת ההלוואות?">
            <TextInput
              type="number"
              value={data.otherLoansBalance}
              onChange={(v) => update("otherLoansBalance", v)}
              placeholder="למשל: 50,000"
              suffix="₪"
            />
          </Question>
        </Reveal>
      </Question>

      {/* Owns apartment */}
      <Question label="יש לך דירה בבעלותך?">
        <Toggle
          checked={data.ownsApartment}
          onChange={(v) => update("ownsApartment", v)}
          label="כן, יש לי דירה"
          sublabel="בין אם יש משכנתא ובין אם לא"
        />
        <Reveal show={data.ownsApartment}>
          <Question label="מה הערך המשוער של הדירה?">
            <TextInput
              type="number"
              value={data.apartmentValue}
              onChange={(v) => update("apartmentValue", v)}
              placeholder="למשל: 2,500,000"
              suffix="₪"
            />
          </Question>
        </Reveal>
      </Question>

      {/* Liquid savings */}
      <Question
        label="כמה חסכונות נזילים יש לך?"
        hint="כסף שניתן למשוך בקלות — עו״ש, פיקדונות, קרנות כסף"
      >
        <TextInput
          type="number"
          value={data.liquidSavings}
          onChange={(v) => update("liquidSavings", v)}
          placeholder="למשל: 100,000"
          suffix="₪"
        />
      </Question>
    </div>
  );
}
