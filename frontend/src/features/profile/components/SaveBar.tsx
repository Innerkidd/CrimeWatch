import { motion } from 'framer-motion';
import { Save, X, RotateCcw, Loader2 } from 'lucide-react';

interface SaveBarProps {
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
  onReset: () => void;
}

export const SaveBar = ({ hasChanges, isSaving, onSave, onCancel, onReset }: SaveBarProps) => {
  if (!hasChanges) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-strong rounded-2xl px-5 py-3 flex items-center gap-3 border border-white/10 shadow-2xl">
        <span className="text-sm text-slate-300 mr-2">You have unsaved changes</span>

        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 transition-all"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </motion.div>
  );
};

export default SaveBar;
