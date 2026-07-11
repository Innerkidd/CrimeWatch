import React from 'react';
import { Plus, Check, Shield, Radio, Server } from 'lucide-react';
import type { SystemLog } from '../hooks/useAdminState';

interface SystemActivityFeedProps {
  logs: SystemLog[];
}

export const SystemActivityFeed: React.FC<SystemActivityFeedProps> = ({ logs }) => {
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <Plus className="w-3.5 h-3.5 text-cyber-cyan glow-cyan" />;
      case 'verification':
        return <Check className="w-3.5 h-3.5 text-cyber-cyan glow-cyan" />;
      case 'assignment':
        return <Shield className="w-3.5 h-3.5 text-cyber-green glow-green" />;
      case 'alert':
        return <Radio className="w-3.5 h-3.5 text-cyber-pink glow-pink" />;
      default:
        return <Server className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 font-tech">
      <div>
        <h3 className="text-sm font-bold tracking-wider text-cyber-cyan glow-cyan uppercase font-orbitron">OPERATIONS_AUDIT_LOG</h3>
        <p className="text-slate-500 text-[10px] mt-0.5 uppercase tracking-wide">// Real-time audit trails of dispatch activities</p>
      </div>

      <div className="relative border-l border-cyber-cyan/15 ml-4 pl-6 space-y-6 max-h-[380px] overflow-y-auto pr-2">
        {logs.map((log) => (
          <div key={log.id} className="relative group">
            {/* Timeline Circle */}
            <span className="absolute -left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-none bg-cyber-void border border-cyber-cyan/30 shadow-md">
              {getLogIcon(log.type)}
            </span>

            <div className="space-y-0.5 uppercase text-left">
              <span className="text-[9px] text-cyber-cyan glow-cyan font-bold block tracking-wider">// EVENT_TYPE: {log.type}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{log.message}</p>
              <span className="text-[9px] text-slate-500 block pt-0.5">TIMESTAMP: {log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SystemActivityFeed;
