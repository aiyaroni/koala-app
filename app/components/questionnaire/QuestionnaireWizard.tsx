"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionnaireState, initialState } from "./types";
import StepIndicator from "./StepIndicator";
import StepPersonal from "./StepPersonal";
import StepEmployment from "./StepEmployment";
import StepAssets from "./StepAssets";
import StepPension from "./StepPension";
import StepInsurance from "./StepInsurance";
import StepGoals from "./StepGoals";
import StepDocuments from "./StepDocuments";

const TOTAL_STEPS = 7;

function isStepValid(step: number, state: QuestionnaireState): boolean {
  switch (step) {
    case 0: {
      const age = Number(state.personal.age);
      return !!(
        age >= 18 && age <= 80 &&
        state.personal.gender &&
        state.personal.maritalStatus
      );
    }
    case 1:
      return !!(state.employment.employmentType && state.employment.grossSalary);
    case 2:
      // Assets — no required fields
      return true;
    case 3:
      // Pension — employer contribution is required
      return !!state.pension.employerContributes;
    case 4:
      // Insurance — car insurance choice is required
      return !!state.insurance.carInsurance;
    case 5:
      return !!(
        state.goals.biggestFinancialConcern.trim() &&
        state.goals.familyIfCantWork &&
        state.goals.monthsWithoutIncome
      );
    case 6:
      // Documents — optional, improves analysis quality but not required
      return true;
    default:
      return true;
  }
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function QuestionnaireWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<QuestionnaireState>(initialState);
  const [done, setDone] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const goNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const valid = isStepValid(step, state);

  // Serialize state for JSON display (without File objects)
  const jsonState = {
    ...state,
    documents: {
      pensionReport: state.documents.pensionReport
        ? { name: state.documents.pensionReport.name, type: state.documents.pensionReport.type }
        : null,
      insurancePolicies: state.documents.insurancePolicies.map((f) => ({
        name: f.name,
        type: f.type,
      })),
      payslips: state.documents.payslips.map((f) => ({
        name: f.name,
        type: f.type,
      })),
    },
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 py-8"
      >
        {/* Success */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
          style={{ background: "linear-gradient(135deg, #84cc16, #d946ef)" }}
        >
          🎉
        </motion.div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-stone-100">עשית את זה!</h2>
          <p className="text-stone-400 mt-2 max-w-md leading-relaxed">
            השאלון הושלם. הנתונים שלך נקלטו בהצלחה. בקרוב יצור איתך קשר יועץ KOALA עם ניתוח מעמיק.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-2">
          <SummaryCard
            emoji="👤"
            label="גיל"
            value={state.personal.age ? `${state.personal.age}` : "—"}
          />
          <SummaryCard
            emoji="💼"
            label="סוג תעסוקה"
            value={
              state.employment.employmentType === "employee"
                ? "שכיר/ה"
                : state.employment.employmentType === "self-employed"
                ? "עצמאי/ת"
                : state.employment.employmentType === "both"
                ? "שילוב"
                : "—"
            }
          />
          <SummaryCard
            emoji="💰"
            label="שכר ברוטו"
            value={
              state.employment.grossSalary
                ? `₪${Number(state.employment.grossSalary).toLocaleString("he-IL")}`
                : "—"
            }
          />
          <SummaryCard
            emoji="🎯"
            label="סיכון"
            value={`${state.goals.riskTolerance}/10`}
          />
        </div>

        {/* JSON debug toggle */}
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          className="text-sm text-stone-500 hover:text-stone-300 transition-colors underline mt-2"
        >
          {showJson ? "הסתר" : "הצג"} JSON מלא (debug)
        </button>

        <AnimatePresence>
          {showJson && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full overflow-hidden"
            >
              <pre
                className="p-4 rounded-2xl text-xs text-stone-300 overflow-auto max-h-96 leading-relaxed"
                style={{ background: "#0c0a09", direction: "ltr", textAlign: "left" }}
              >
                {JSON.stringify(jsonState, null, 2)}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => {
            setState(initialState);
            setStep(0);
            setDone(false);
          }}
          className="mt-2 px-6 py-3 rounded-full text-sm font-medium text-stone-400 border border-stone-700 hover:border-stone-500 transition-all"
        >
          התחל מחדש
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto">
      <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[520px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            {step === 0 && (
              <StepPersonal
                data={state.personal}
                onChange={(d) => setState((s) => ({ ...s, personal: d }))}
              />
            )}
            {step === 1 && (
              <StepEmployment
                data={state.employment}
                onChange={(d) => setState((s) => ({ ...s, employment: d }))}
              />
            )}
            {step === 2 && (
              <StepAssets
                data={state.assets}
                onChange={(d) => setState((s) => ({ ...s, assets: d }))}
              />
            )}
            {step === 3 && (
              <StepPension
                data={state.pension}
                onChange={(d) => setState((s) => ({ ...s, pension: d }))}
              />
            )}
            {step === 4 && (
              <StepInsurance
                data={state.insurance}
                onChange={(d) => setState((s) => ({ ...s, insurance: d }))}
              />
            )}
            {step === 5 && (
              <StepGoals
                data={state.goals}
                onChange={(d) => setState((s) => ({ ...s, goals: d }))}
              />
            )}
            {step === 6 && (
              <StepDocuments
                data={state.documents}
                onChange={(d) => setState((s) => ({ ...s, documents: d }))}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 gap-4">
        {/* Back */}
        <motion.button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ borderColor: "#44403c", color: "#a8a29e" }}
        >
          → חזרה
        </motion.button>

        {/* Forward */}
        <motion.button
          type="button"
          onClick={goNext}
          disabled={!valid}
          whileTap={valid ? { scale: 0.95 } : {}}
          whileHover={valid ? { scale: 1.02 } : {}}
          className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: valid
              ? "linear-gradient(to left, #84cc16, #65a30d)"
              : "#292524",
            color: valid ? "#1c1917" : "#57534e",
            border: valid ? "none" : "1px solid #44403c",
          }}
        >
          {step === TOTAL_STEPS - 1 ? (
            <>
              סיום ושליחה
              <span className="text-base">🚀</span>
            </>
          ) : (
            <>
              קדימה
              <span className="text-base">←</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Required fields note */}
      {!valid && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-center mt-3"
          style={{ color: "#d946ef" }}
        >
          יש למלא את השדות החובה כדי להמשיך
        </motion.p>
      )}
    </div>
  );
}

function SummaryCard({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-2xl"
      style={{ background: "rgba(41,37,36,0.8)", border: "1px solid #44403c" }}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-xs text-stone-500">{label}</span>
      <span className="text-base font-semibold text-stone-100">{value}</span>
    </div>
  );
}
