'use client';

import { motion } from 'framer-motion';
import { MaterialSymbol } from './MaterialSymbol';

interface AlertProps {
  type: 'success' | 'warning';
  title?: string;
  message: string;
  onClose?: () => void;
}

const alertConfig = {
  success: {
    icon: 'check_circle',
    bgColor: 'bg-success-bg',
    textColor: 'text-success',
    borderColor: 'border-success',
    lineColor: 'bg-success',
  },
  warning: {
    icon: 'warning',
    bgColor: 'bg-warning-bg',
    textColor: 'text-warning',
    borderColor: 'border-warning',
    lineColor: 'bg-warning',
  },
};

export function Alert({ type, title, message, onClose }: AlertProps) {
  const config = alertConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-lg p-4 flex items-start gap-4`}
    >
      <div className={config.textColor}>
        <MaterialSymbol icon={config.icon} className="text-2xl" />
      </div>

      <div className="flex-1">
        {title && <h3 className={`${config.textColor} font-bold mb-1 text-sm`}>{title}</h3>}
        <p className={`${config.textColor} text-sm leading-relaxed`}>{message}</p>
      </div>

      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className={`${config.textColor} hover:opacity-70 transition-opacity`}
        >
          <MaterialSymbol icon="close" className="text-xl" />
        </motion.button>
      )}
    </motion.div>
  );
}
