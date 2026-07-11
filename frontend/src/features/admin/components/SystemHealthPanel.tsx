import React from 'react';
import { Server, Database, Wifi, Shield, Activity, CheckCircle } from 'lucide-react';

interface SystemHealthPanelProps {
  onlineOfficers: number;
  totalOfficers: number;
  activeAlerts: number;
  totalReports: number;
}

export const SystemHealthPanel: React.FC<SystemHealthPanelProps> = ({
  onlineOfficers,
  totalOfficers,
  activeAlerts,
  totalReports,
}) => {
  const systems = [
    { name: 'API Gateway', status: 'Operational', icon: Server, ok: true },
    { name: 'Database Cluster', status: 'Operational', icon: Database, ok: true },
    { name: 'WebSocket Feed', status: 'Operational', icon: Wifi, ok: true },
    { name: 'Auth Service', status: 'Operational', icon: Shield, ok: true },
    { name: 'Alert Pipeline', status: activeAlerts > 5 ? 'High Load' : 'Operational', icon: Activity, ok: activeAlerts <= 5 },
  ];

  return (
    <div className="space-y-4 font-tech text-xs uppercase">
      <h3 className="text-[10px] font-bold text-cyber-cyan glow-cyan tracking-widest">SYSTEM_HEALTH</h3>

      <div className="space-y-2">
        {systems.map((sys, idx) => {
          const Icon = sys.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 p-2 border border-cyber-cyan/10 bg-cyber-void/50">
              <div className={`w-7 h-7 rounded-none flex items-center justify-center flex-shrink-0 border ${
                sys.ok ? 'bg-cyber-green/10 border-cyber-green/30' : 'bg-cyber-yellow/10 border-cyber-yellow/30'
              }`}>
                <Icon className={`w-3.5 h-3.5 ${sys.ok ? 'text-cyber-green glow-green' : 'text-cyber-yellow glow-yellow'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-200">{sys.name}</p>
                <p className={`text-[9px] ${sys.ok ? 'text-cyber-green' : 'text-cyber-yellow'}`}>{sys.status}</p>
              </div>
              {sys.ok && <CheckCircle className="w-3 h-3 text-cyber-green" />}
            </div>
          );
        })}
      </div>

      <div className="border-t border-cyber-cyan/15 pt-3 mt-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 border border-cyber-cyan/10 bg-cyber-void/50 text-center">
            <p className="text-lg font-black text-cyber-green font-orbitron">{onlineOfficers}/{totalOfficers}</p>
            <p className="text-[8px] text-slate-500">Officers Online</p>
          </div>
          <div className="p-2 border border-cyber-cyan/10 bg-cyber-void/50 text-center">
            <p className="text-lg font-black text-cyber-pink font-orbitron">{activeAlerts}</p>
            <p className="text-[8px] text-slate-500">Active Alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPanel;
