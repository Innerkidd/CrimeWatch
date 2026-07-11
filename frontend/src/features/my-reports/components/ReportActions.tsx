import { motion } from 'framer-motion';
import { Edit3, Trash2, Eye, Plus, Download, MessageSquare } from 'lucide-react';
import { type ReportStatus } from '../data/mockData';

interface ReportActionsProps {
  status: ReportStatus;
  reportId: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewUpdates?: (id: string) => void;
  onAddEvidence?: (id: string) => void;
  onDownload?: (id: string) => void;
  onFeedback?: (id: string) => void;
}

export const ReportActions = ({
  status,
  reportId,
  onEdit,
  onDelete,
  onViewUpdates,
  onAddEvidence,
  onDownload,
  onFeedback,
}: ReportActionsProps) => {
  const getActions = () => {
    switch (status) {
      case 'pending':
        return [
          { icon: Edit3, label: 'Edit', color: 'text-amber-400', action: () => onEdit?.(reportId) },
          { icon: Trash2, label: 'Delete', color: 'text-red-400', action: () => onDelete?.(reportId) },
        ];
      case 'verified':
      case 'investigating':
        return [
          { icon: Plus, label: 'Add Evidence', color: 'text-blue-400', action: () => onAddEvidence?.(reportId) },
          { icon: Eye, label: 'View Updates', color: 'text-purple-400', action: () => onViewUpdates?.(reportId) },
        ];
      case 'resolved':
        return [
          { icon: Download, label: 'Download PDF', color: 'text-emerald-400', action: () => onDownload?.(reportId) },
          { icon: MessageSquare, label: 'Feedback', color: 'text-amber-400', action: () => onFeedback?.(reportId) },
        ];
      case 'rejected':
        return [
          { icon: Edit3, label: 'Edit & Resubmit', color: 'text-amber-400', action: () => onEdit?.(reportId) },
        ];
      default:
        return [];
    }
  };

  const actions = getActions();

  return (
    <div className="flex items-center gap-1.5">
      {actions.map((action) => (
        <motion.button
          key={action.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.action}
          title={action.label}
          className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors ${action.color}`}
        >
          <action.icon className="w-3.5 h-3.5" />
        </motion.button>
      ))}
    </div>
  );
};

export default ReportActions;
