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
    { label: 'Verify Report', icon: Shield, onClick: onVerifyClick, color: 'text-cyber-cyan border-cyber-cyan/25 bg-cyber-cyan/5 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/15 hover:shadow-[0_0_12px_rgba(0,212,255,0.15)] glow-cyan' },
    { label: 'Add Officer', icon: Plus, onClick: onAddOfficerClick, color: 'text-cyber-cyan border-cyber-cyan/25 bg-cyber-cyan/5 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/15 hover:shadow-[0_0_12px_rgba(0,212,255,0.15)] glow-cyan' },
    { label: 'Broadcast Alert', icon: Radio, onClick: onBroadcastClick, color: 'text-cyber-pink border-cyber-pink/25 bg-cyber-pink/5 hover:border-cyber-pink/60 hover:bg-cyber-pink/15 hover:shadow-[0_0_12px_rgba(255,0,119,0.15)] glow-pink' },
    { label: 'Open Live Map', icon: Map, onClick: onOpenMapClick, color: 'text-cyber-green border-cyber-green/25 bg-cyber-green/5 hover:border-cyber-green/60 hover:bg-cyber-green/15 hover:shadow-[0_0_12px_rgba(0,255,136,0.15)] glow-green' },
    { label: 'Export Reports', icon: Download, onClick: onExportClick, color: 'text-cyber-yellow border-cyber-yellow/25 bg-cyber-yellow/5 hover:border-cyber-yellow/60 hover:bg-cyber-yellow/15 hover:shadow-[0_0_12px_rgba(255,179,0,0.15)] glow-yellow' },
  ];

  return (
    <div className="space-y-4 font-tech">
      <div>
        <h3 className="text-sm font-bold tracking-wider text-cyber-cyan glow-cyan uppercase font-orbitron">DISPATCH_COMMANDS</h3>
        <p className="text-slate-500 text-[10px] mt-0.5 uppercase tracking-wide">// Quick triggers for smart city commands</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <button
              key={index}
              onClick={act.onClick}
              className={`border p-4 rounded-none flex flex-col items-center justify-center text-center gap-2 transition-all duration-250 font-bold uppercase text-[10px] h-24 cursor-pointer chamfer-button relative ${act.color}`}
            >
              {/* HUD Brackets Corners */}
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />

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
