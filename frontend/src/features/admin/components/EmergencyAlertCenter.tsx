import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, Users, Radio, Send, X, AlertTriangle } from 'lucide-react';
import type { EmergencyAlert } from '../hooks/useAdminState';

interface EmergencyAlertCenterProps {
  alerts: EmergencyAlert[];
  onBroadcast: (type: EmergencyAlert['type'], title: string, severity: EmergencyAlert['severity']) => void;
}

export const EmergencyAlertCenter: React.FC<EmergencyAlertCenterProps> = ({
  alerts,
  onBroadcast,
}) => {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastType, setBroadcastType] = useState<EmergencyAlert['type']>('Broadcasting Alert');
  const [broadcastSeverity, setBroadcastSeverity] = useState<EmergencyAlert['severity']>('High');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle) return;
    onBroadcast(broadcastType, broadcastTitle, broadcastSeverity);
    setBroadcastTitle('');
    setShowBroadcastModal(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'border-cyber-pink/35 bg-cyber-pink/5 text-cyber-pink glow-pink';
      case 'High':
        return 'border-cyber-yellow/35 bg-cyber-yellow/5 text-cyber-yellow glow-yellow';
      default:
        return 'border-cyber-cyan/35 bg-cyber-cyan/5 text-cyber-cyan glow-cyan';
    }
  };

  return (
    <div className="space-y-6 font-tech text-xs uppercase p-5 relative hud-panel">
      {/* HUD Brackets Corners */}
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-sm font-bold tracking-wider text-cyber-cyan glow-cyan uppercase font-orbitron">DISPATCH_ALERTS_CENTER</h3>
          <p className="text-slate-500 text-[10px] mt-0.5 uppercase tracking-wide">// Broadcast community-wide emergency warnings</p>
        </div>

        <button
          onClick={() => setShowBroadcastModal(true)}
          className="flex items-center gap-1.5 bg-cyber-pink hover:bg-cyber-pink/90 px-4 py-2 text-[10px] font-bold text-white transition-colors animate-pulse rounded-none cursor-pointer chamfer-button shadow-[0_0_10px_rgba(255,0,119,0.3)]"
        >
          <Radio className="w-4 h-4" />
          <span>BROADCAST_WARNING</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Active Emergency List */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">// ACTIVE_ALERTS ({alerts.length})</h4>
          
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border p-4 rounded-none flex gap-3.5 relative overflow-hidden transition-all duration-300 text-left ${getSeverityColor(alert.severity)}`}
              >
                {/* HUD Corners inside Alert panel */}
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />

                {alert.severity === 'Critical' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyber-pink animate-pulse" />
                )}
                
                <div className="w-9 h-9 rounded-none flex items-center justify-center flex-shrink-0 bg-cyber-void border border-cyber-cyan/35">
                  {alert.type === 'Active Threat' ? (
                    <AlertTriangle className="w-4.5 h-4.5 text-cyber-pink glow-pink" />
                  ) : alert.type === 'Missing Person' ? (
                    <Users className="w-4.5 h-4.5 text-cyber-yellow glow-yellow" />
                  ) : (
                    <Bell className="w-4.5 h-4.5 text-cyber-cyan glow-cyan" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{alert.type}</span>
                    <span className="text-[9px] bg-cyber-void px-1.5 py-0.5 rounded-none font-mono font-bold border border-cyber-cyan/20">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 normal-case leading-normal">{alert.title}</p>
                  <span className="text-[9px] text-slate-500 block pt-0.5">DISPATCH_TIME: {alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch Guidelines Panel */}
        <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none p-6 flex flex-col justify-between relative">
          {/* HUD Brackets Corners */}
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">// SECURITY_PROTOCOL</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex gap-2">
                <span className="text-cyber-pink font-bold">01.</span>
                <span>Verify report integrity prior to broadcasting critical alerts.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyber-yellow font-bold">02.</span>
                <span>Active Threat dispatches trigger automated SMS/Push to nearby users.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyber-cyan font-bold">03.</span>
                <span>Ensure physical landmarks are clearly written in description details.</span>
              </li>
            </ul>
          </div>

          <div className="bg-cyber-pink/5 border border-cyber-pink/25 p-4 rounded-none mt-6">
            <div className="flex items-center gap-2 text-cyber-pink text-xs font-bold">
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>Warning: Community broadcasts cannot be retracted.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Alert Modal */}
      <AnimatePresence>
        {showBroadcastModal && (
          <div className="fixed inset-0 bg-cyber-void/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-cyber-void border border-cyber-cyan/35 rounded-none max-w-md w-full p-6 space-y-6 shadow-2xl relative text-left"
            >
              {/* HUD Brackets Corners */}
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />

              <div className="flex justify-between items-center border-b border-cyber-cyan/20 pb-4">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-orbitron uppercase text-cyber-pink glow-pink tracking-wider">
                  <Radio className="w-5 h-5 text-cyber-pink glow-pink" />
                  <span>Dispatch emergency alert</span>
                </h3>
                <button onClick={() => setShowBroadcastModal(false)} className="text-cyber-cyan hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-tech uppercase">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alert Heading</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="E.G. ACTIVE INTRUDER SPOTTED IN SECTOR 4..."
                    className="mt-1.5 w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-3.5 py-2.5 text-cyber-cyan placeholder-cyber-cyan/40 focus:outline-none focus:border-cyber-cyan/70 focus:ring-1 focus:ring-cyber-cyan/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alert Type</label>
                    <select
                      value={broadcastType}
                      onChange={(e) => setBroadcastType(e.target.value as any)}
                      className="mt-1.5 w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-3.5 py-2.5 text-cyber-cyan focus:outline-none focus:border-cyber-cyan/70 focus:ring-1 focus:ring-cyber-cyan/10 font-tech uppercase"
                    >
                      <option value="Active Threat">Active Threat</option>
                      <option value="Missing Person">Missing Person</option>
                      <option value="High-Priority Alert">High-Priority Alert</option>
                      <option value="Broadcasting Alert">General Warning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Severity</label>
                    <select
                      value={broadcastSeverity}
                      onChange={(e) => setBroadcastSeverity(e.target.value as any)}
                      className="mt-1.5 w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-3.5 py-2.5 text-cyber-cyan focus:outline-none focus:border-cyber-cyan/70 focus:ring-1 focus:ring-cyber-cyan/10 font-tech uppercase"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-cyber-cyan/20">
                  <button
                    type="button"
                    onClick={() => setShowBroadcastModal(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white font-bold transition-all text-[10px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-cyber-pink hover:bg-cyber-pink/90 px-5 py-2 text-white font-bold transition-all text-[10px] flex items-center gap-1.5 rounded-none cursor-pointer chamfer-button shadow-[0_0_10px_rgba(255,0,119,0.3)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Broadcast</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default EmergencyAlertCenter;
