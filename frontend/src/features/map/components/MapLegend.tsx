import { motion } from 'framer-motion';
import { severityColors } from '../data/mockData';

export const MapLegend = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute bottom-20 left-4 z-[1000] glass-strong rounded-xl px-4 py-3"
    >
      <h4 className="text-xs font-bold text-white mb-2">Legend</h4>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: severityColors.high }} />
          <span className="text-[11px] text-slate-300">High Severity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: severityColors.medium }} />
          <span className="text-[11px] text-slate-300">Medium Severity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: severityColors.low }} />
          <span className="text-[11px] text-slate-300">Low Severity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[11px] text-slate-300">Resolved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
          <span className="text-[11px] text-slate-300">Your Location</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MapLegend;
