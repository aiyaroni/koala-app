"use client";

import { PersonalData } from "./types";
import {
  Question,
  TextInput,
  PillRadio,
  SelectInput,
  Toggle,
  Reveal,
} from "./ui";

interface Props {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
}

export default function StepPersonal({ data, onChange }: Props) {
  const update = <K extends keyof PersonalData>(key: K, value: PersonalData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-stone-100">קצת עליך 👋</h2>
        <p className="text-stone-400 mt-1 text-sm">
          כמה שאלות בסיסיות כדי שנוכל להכיר אותך טוב יותר
        </p>
      </div>

      {/* Age */}
      <Question label="מה גילך?">
        <TextInput
          type="number"
          value={data.age}
          onChange={(v) => update("age", v)}
          placeholder="למשל: 35"
          min="18"
          max="80"
          suffix="שנים"
        />
      </Question>

      {/* Gender */}
      <Question label="מה המין שלך?">
        <PillRadio
          options={[
            { value: "male", label: "זכר", emoji: "👨" },
            { value: "female", label: "נקבה", emoji: "👩" },
          ]}
          value={data.gender}
          onChange={(v) => update("gender", v as PersonalData["gender"])}
        />
      </Question>

      {/* Marital status */}
      <Question label="מה המצב המשפחתי שלך?">
        <SelectInput
          value={data.maritalStatus}
          onChange={(v) => update("maritalStatus", v as PersonalData["maritalStatus"])}
          placeholder="בחר/י..."
          options={[
            { value: "single", label: "רווק/ה" },
            { value: "married", label: "נשוי/אה" },
            { value: "divorced", label: "גרוש/ה" },
            { value: "widowed", label: "אלמן/ה" },
          ]}
        />
      </Question>

      {/* Children */}
      <Question label="כמה ילדים יש לך?" hint="הכנס 0 אם אין">
        <TextInput
          type="number"
          value={data.children}
          onChange={(v) => update("children", v)}
          placeholder="0"
          min="0"
          max="10"
          suffix="ילדים"
        />
      </Question>

      {/* Youngest child age - only if children > 0 */}
      <Reveal show={Number(data.children) > 0}>
        <Question label="מה גיל הילד הצעיר שלך?">
          <TextInput
            type="number"
            value={data.youngestChildAge}
            onChange={(v) => update("youngestChildAge", v)}
            placeholder="למשל: 7"
            min="0"
            max="30"
            suffix="שנים"
          />
        </Question>
      </Reveal>

      {/* New immigrant */}
      <Question label="האם עלית לישראל?" hint="עולה חדש מחו״ל">
        <Toggle
          checked={data.isNewImmigrant}
          onChange={(v) => update("isNewImmigrant", v)}
          label="כן, עליתי לישראל"
          sublabel="יש לי זכויות מיוחדות כעולה"
        />
        <Reveal show={data.isNewImmigrant}>
          <Question label="באיזו שנה עלית?">
            <TextInput
              type="number"
              value={data.immigrationYear}
              onChange={(v) => update("immigrationYear", v)}
              placeholder="למשל: 2018"
              min="1948"
              max="2026"
              suffix="שנה"
            />
          </Question>
        </Reveal>
      </Question>
    </div>
  );
}
