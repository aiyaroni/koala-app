import React from 'react';

interface MaterialSymbolProps {
  icon: string;
  className?: string;
  filled?: boolean;
  weight?: number;
  grade?: number;
  opticalSize?: number;
}

export function MaterialSymbol({
  icon,
  className = '',
  filled = false,
  weight = 400,
  grade = 0,
  opticalSize = 24,
}: MaterialSymbolProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
      }}
    >
      {icon}
    </span>
  );
}
