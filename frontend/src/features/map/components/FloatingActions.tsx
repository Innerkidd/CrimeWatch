import { motion } from 'framer-motion';
import { AlertTriangle, Navigation, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FloatingActionsProps {
  onRefresh: () => void;
  onLocate: () => void;
  loading?: boolean;
}

export const FloatingActions = ({ onRefresh, onLocate, loading }: FloatingActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-3">
      {/* Report Crime */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/reports')}
        className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-500/40 transition-all duration-200 hover:scale-105"
      >
        <AlertTriangle className="w-5 h-5" />
        <span className="hidden sm:inline">Report Crime</span>
      </motion.button>

      {/* Locate Me */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onLocate}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-3 glass hover:bg-white/10 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-60"
      >
        <Navigation className={`w-5 h-5 text-blue-400 ${loading ? 'animate-pulse' : ''}`} />
        <span className="hidden sm:inline text-sm">
          {loading ? 'Locating...' : 'Locate Me'}
        </span>
      </motion.button>

      {/* Refresh */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-3 glass hover:bg-white/10 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-60"
      >
        <RefreshCw className={`w-5 h-5 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
        <span className="hidden sm:inline text-sm">Refresh</span>
      </motion.button>
    </div>
  );
};

export default FloatingActions;
