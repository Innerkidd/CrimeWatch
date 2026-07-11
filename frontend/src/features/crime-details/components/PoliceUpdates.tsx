import { motion } from 'framer-motion';
import { Shield, Calendar, Clock } from 'lucide-react';
import { type PoliceUpdate } from '../data/mockData';

interface PoliceUpdatesProps {
  updates: PoliceUpdate[];
}

export const PoliceUpdates = ({ updates }: PoliceUpdatesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
        <Shield className="w-5 h-5 text-blue-400" />
        Police Updates
      </h2>

      <div className="space-y-4">
        {updates.map((update, i) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
                  {update.officer.split(' ').pop()?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{update.officer}</p>
                  <p className="text-[11px] text-slate-500">Badge: {update.badge}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                {update.status}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{update.message}</p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {update.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {update.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PoliceUpdates;
