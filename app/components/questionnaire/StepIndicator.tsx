"use client";

import { motion } from "framer-motion";

export interface StepInfo {
  label: string;
  icon: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: StepInfo[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative h-2 rounded-full bg-[#E5E0D8] mb-5 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 right-0 rounded-full"
          style={{ background: "#A85838" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Step dots */}
      <div className="flex justify-between items-start px-1">
        {steps.map((step, id) => {
          const isCompleted = id < currentStep;
          const isActive = id === currentStep;
          const isFuture = id > currentStep;

          return (
            <div
              key={id}
              className="flex flex-col items-center gap-1.5"
              style={{ width: `${100 / totalSteps}%` }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : isCompleted ? [1.4, 1] : 1,
                  backgroundColor: isCompleted
                    ? "#A85838"
                    : isActive
                    ? "#C97A5B"
                    : "#E5E0D8",
                }}
                transition={{
                  duration: isCompleted && !isActive ? 0.4 : 0.3,
                  type: isCompleted && !isActive ? "spring" : "linear",
                  stiffness: 300,
                  damping: 15,
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ flexShrink: 0 }}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4 text-[#FFFFFF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span style={{ fontSize: "14px", opacity: isFuture ? 0.4 : 1 }}>
                    {step.icon}
                  </span>
                )}
              </motion.div>

              <span
                className="text-xs text-center leading-tight hidden sm:block"
                style={{
                  color: isActive ? "#A85838" : isCompleted ? "#A85838" : "#555555",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step counter */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-stone-500">
          שלב {currentStep + 1} מתוך {totalSteps}
        </span>
        <span className="text-xs font-medium" style={{ color: "#A85838" }}>
          {steps[currentStep]?.label}
        </span>
      </div>
    </div>
  );
}
