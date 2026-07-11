import React from 'react';
import { Shield, Plus, Radio, Download, Map } from 'lucide-react';

interface QuickActionPanelProps {
  onVerifyClick: () => void;
  onAddOfficerClick: () => void;
  onBroadcastClick: () => void;
  onOpenMapClick: () => void;
  onExportClick: () => void;
}

export const QuickActionPanel: React.FC<QuickActionPanelProps> = ({
  onVerifyClick,
  onAddOfficerClick,
  onBroadcastClick,
  onOpenMapClick,
  onExportClick,
}) => {
  const actions = [
    { label: 'Verify Report', icon: Shield, onClick: onVerifyClick, color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10' },
    { label: 'Add Officer', icon: Plus, onClick: onAddOfficerClick, color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10' },
    { label: 'Broadcast Alert', icon: Radio, onClick: onBroadcastClick, color: 'text-rose-400 border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10' },
    { label: 'Open Live Map', icon: Map, onClick: onOpenMapClick, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10' },
    { label: 'Export Reports', icon: Download, onClick: onExportClick, color: 'text-amber-500 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-100">Dispatches Actions</h3>
        <p className="text-slate-500 text-xs mt-0.5">Quick triggers for smart city commands</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <button
              key={index}
              onClick={act.onClick}
              className={`border p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 font-semibold text-xs h-24 shadow-md ${act.color}`}
            >
              <Icon className="w-5 h-5" />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default QuickActionPanel;
