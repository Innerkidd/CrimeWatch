import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Share2, Download, Edit3, UserPlus, XCircle, FileText } from 'lucide-react';
import { ToastContainer, type ToastItem } from '@/shared/components/ui/Toast';

interface ActionBarProps {
  role?: 'citizen' | 'police' | 'admin';
}

export const ActionBar = ({ role = 'citizen' }: ActionBarProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (type: ToastItem['type'], message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const citizenActions = [
    { icon: Eye, label: 'Track Status', color: 'text-blue-400', action: () => addToast('success', 'Status tracking enabled.') },
    { icon: Share2, label: 'Share', color: 'text-emerald-400', action: () => addToast('success', 'Link copied to clipboard.') },
    { icon: Download, label: 'Download PDF', color: 'text-violet-400', action: () => addToast('success', 'PDF download started.') },
  ];

  const policeActions = [
    { icon: Edit3, label: 'Update Status', color: 'text-amber-400', action: () => addToast('success', 'Status update panel opened.') },
    { icon: UserPlus, label: 'Assign Officer', color: 'text-blue-400', action: () => addToast('success', 'Officer assignment panel opened.') },
    { icon: FileText, label: 'Add Note', color: 'text-emerald-400', action: () => addToast('success', 'Note added to case file.') },
    { icon: XCircle, label: 'Close Case', color: 'text-red-400', action: () => addToast('success', 'Case closed successfully.') },
  ];

  const actions = role === 'citizen' ? citizenActions : policeActions;

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex flex-wrap items-center gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.action}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-slate-300 hover:text-white"
            >
              <action.icon className={`w-4 h-4 ${action.color}`} />
              {action.label}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default ActionBar;
