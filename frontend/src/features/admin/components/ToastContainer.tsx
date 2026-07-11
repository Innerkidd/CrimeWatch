import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import type { ToastMessage } from '../hooks/useAdminState';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const getToastStyle = (type: string) => {
    switch (type) {
      case 'success':
        return { border: 'border-emerald-500/20', bg: 'bg-slate-950/95', text: 'text-emerald-400', icon: CheckCircle };
      case 'warning':
        return { border: 'border-amber-500/20', bg: 'bg-slate-950/95', text: 'text-amber-500', icon: AlertTriangle };
      case 'danger':
        return { border: 'border-rose-500/20', bg: 'bg-slate-950/95', text: 'text-rose-500', icon: AlertCircle };
      default:
        return { border: 'border-indigo-500/20', bg: 'bg-slate-950/95', text: 'text-indigo-400', icon: Info };
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const style = getToastStyle(t.type);
          const Icon = style.icon;
          return (
            <motion.div
              layout
              key={t.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`pointer-events-auto border ${style.border} ${style.bg} p-4 rounded-xl shadow-2xl flex items-start gap-3 justify-between`}
            >
              <div className="flex gap-2.5 items-start">
                <Icon className={`w-5 h-5 flex-shrink-0 ${style.text} mt-0.5`} />
                <span className="text-xs font-semibold text-slate-200 leading-normal">{t.message}</span>
              </div>
              <button
                onClick={() => onRemove(t.id)}
                className="text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
export default ToastContainer;
