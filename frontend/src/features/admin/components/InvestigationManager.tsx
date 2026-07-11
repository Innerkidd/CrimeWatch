import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Check } from 'lucide-react';
import type { Investigation } from '../hooks/useAdminState';

interface InvestigationManagerProps {
  investigations: Investigation[];
  onUpdateProgress: (caseId: string, progress: number) => void;
  onCloseCase: (caseId: string) => void;
}

export const InvestigationManager: React.FC<InvestigationManagerProps> = ({
  investigations,
  onUpdateProgress,
  onCloseCase,
}) => {
  const [filterPriority, setFilterPriority] = useState('All');

  const filteredInvestigations = investigations.filter((inv) => {
    return filterPriority === 'All' || inv.priority === filterPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Medium':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Investigation Tracker</h3>
          <p className="text-slate-500 text-xs mt-0.5">Monitor and update active investigations</p>
        </div>

        <div className="flex gap-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInvestigations.length === 0 ? (
          <div className="col-span-2 bg-slate-950/30 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
            No active investigations match this filter.
          </div>
        ) : (
          filteredInvestigations.map((inv) => (
            <motion.div
              layout
              key={inv.id}
              className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl gap-4 hover:border-slate-700/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-indigo-400 font-bold">{inv.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(inv.priority)}`}>
                      {inv.priority}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100 mt-2">{inv.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Reference Report: {inv.caseId}</p>
                </div>
                
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Deadline</span>
                  <span className="text-xs text-slate-350 font-semibold flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{inv.deadline}</span>
                  </span>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Officer: <strong className="text-slate-200">{inv.assignedOfficer}</strong></span>
                  </span>
                  <span className="text-indigo-400 font-bold">{inv.progress}% Completed</span>
                </div>

                <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${inv.progress}%` }}
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 rounded-full"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateProgress(inv.id, inv.progress - 10)}
                      className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-400 hover:text-slate-200 transition-colors"
                      title="Decrease Progress"
                    >
                      -10%
                    </button>
                    <button
                      onClick={() => onUpdateProgress(inv.id, inv.progress + 10)}
                      className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-400 hover:text-slate-200 transition-colors"
                      title="Increase Progress"
                    >
                      +10%
                    </button>
                  </div>

                  <button
                    onClick={() => onCloseCase(inv.id)}
                    className="flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Close Case</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
export default InvestigationManager;
