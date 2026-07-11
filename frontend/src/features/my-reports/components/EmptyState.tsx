import { motion } from 'framer-motion';
import { FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-12 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6"
      >
        <FileText className="w-10 h-10 text-blue-400" />
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-2">No Reports Yet</h3>
      <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
        You haven't submitted any crime reports yet. Help keep your community safe by reporting an incident.
      </p>

      <button
        onClick={() => navigate('/reports')}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-sm font-semibold text-blue-400 hover:bg-blue-500/30 transition-all"
      >
        <Plus className="w-4 h-4" />
        Report Your First Incident
      </button>
    </motion.div>
  );
};

export default EmptyState;
