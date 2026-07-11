import React from 'react';
import { Shield, Wifi, WifiOff } from 'lucide-react';
import type { Officer } from '../hooks/useAdminState';

interface OfficerStatusPanelProps {
  officers: Officer[];
}

export const OfficerStatusPanel: React.FC<OfficerStatusPanelProps> = ({ officers }) => {
  const onlineCount = officers.filter((o) => o.status === 'Online').length;
  const offlineCount = officers.filter((o) => o.status === 'Offline').length;

  return (
    <div className="space-y-4 font-tech text-xs uppercase">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-cyber-cyan glow-cyan tracking-widest">OFFicer_STATUS</h3>
        <span className="text-[9px] text-slate-500">{onlineCount}/{officers.length} ONLINE</span>
      </div>

      <div className="space-y-2">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className={`flex items-center gap-2.5 p-2 border transition-all ${
              officer.status === 'Online'
                ? 'border-cyber-green/20 bg-cyber-green/5'
                : 'border-slate-800 bg-slate-900/30'
            }`}
          >
            <div className={`w-7 h-7 rounded-none flex items-center justify-center flex-shrink-0 border ${
              officer.status === 'Online'
                ? 'bg-cyber-green/10 border-cyber-green/30'
                : 'bg-slate-800 border-slate-700'
            }`}>
              {officer.status === 'Online' ? (
                <Wifi className="w-3.5 h-3.5 text-cyber-green glow-green" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-slate-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] font-bold truncate ${officer.status === 'Online' ? 'text-slate-200' : 'text-slate-500'}`}>
                {officer.name}
              </p>
              <p className="text-[9px] text-slate-500">{officer.rank} &middot; {officer.assignedCases} cases</p>
            </div>
            <span className={`text-[8px] font-bold px-1.5 py-0.5 ${
              officer.availability === 'Available' ? 'text-cyber-green bg-cyber-green/10' :
              officer.availability === 'On Duty' ? 'text-cyber-yellow bg-cyber-yellow/10' :
              'text-slate-500 bg-slate-800'
            }`}>
              {officer.availability}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerStatusPanel;
