import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  error: <XCircle className="w-5 h-5 text-red-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
};

const borders = {
  success: 'border-emerald-500/30',
  error: 'border-red-500/30',
  warning: 'border-amber-500/30',
};

const backgrounds = {
  success: 'bg-emerald-500/10',
  error: 'bg-red-500/10',
  warning: 'bg-amber-500/10',
};

export const Toast = ({ id, type, message, onClose, duration = 5000 }: ToastProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 100 / (duration / 50);
      });
    }, 50);

    const timer = setTimeout(() => onClose(id), duration);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 p-4 rounded-xl border ${borders[type]} ${backgrounds[type]} backdrop-blur-xl shadow-2xl min-w-[300px] max-w-[400px]`}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-200">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl overflow-hidden bg-white/5">
        <motion.div
          className={`h-full ${
            type === 'success'
              ? 'bg-emerald-500'
              : type === 'error'
              ? 'bg-red-500'
              : 'bg-amber-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </motion.div>
  );
};

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
