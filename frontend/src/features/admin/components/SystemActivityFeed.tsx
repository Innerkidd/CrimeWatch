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
        return <Plus className="w-3.5 h-3.5 text-indigo-400" />;
      case 'verification':
        return <Check className="w-3.5 h-3.5 text-cyan-400" />;
      case 'assignment':
        return <Shield className="w-3.5 h-3.5 text-emerald-400" />;
      case 'alert':
        return <Radio className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <Server className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-100">Live Operations Feed</h3>
        <p className="text-slate-500 text-xs mt-0.5">Real-time audit trails of dispatch activities</p>
      </div>

      <div className="relative border-l border-slate-850 ml-4 pl-6 space-y-6 max-h-[380px] overflow-y-auto pr-2">
        {logs.map((log) => (
          <div key={log.id} className="relative group">
            {/* Timeline Circle */}
            <span className="absolute -left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border border-slate-800 shadow-md">
              {getLogIcon(log.type)}
            </span>

            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">{log.type}</span>
              <p className="text-xs text-slate-350 leading-relaxed font-medium">{log.message}</p>
              <span className="text-[10px] text-slate-500 block pt-0.5">{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SystemActivityFeed;
