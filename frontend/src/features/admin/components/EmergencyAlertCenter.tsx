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
        return 'border-rose-600/40 bg-rose-950/20 text-rose-400';
      case 'High':
        return 'border-amber-600/40 bg-amber-950/20 text-amber-400';
      default:
        return 'border-indigo-600/40 bg-indigo-950/20 text-indigo-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Emergency dispatch Center</h3>
          <p className="text-slate-500 text-xs mt-0.5">Broadcast community-wide warnings and alerts</p>
        </div>

        <button
          onClick={() => setShowBroadcastModal(true)}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 px-4 py-2 rounded-lg text-xs font-bold text-white transition-colors animate-pulse"
        >
          <Radio className="w-4 h-4" />
          <span>Broadcast Warning</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Emergency List */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Alerts ({alerts.length})</h4>
          
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border p-4 rounded-xl flex gap-3.5 shadow-md relative overflow-hidden transition-all duration-300 ${getSeverityColor(alert.severity)}`}
              >
                {alert.severity === 'Critical' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-600 animate-pulse" />
                )}
                
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-900 border border-slate-800`}>
                  {alert.type === 'Active Threat' ? (
                    <AlertTriangle className="w-4.5 h-4.5 text-rose-500" />
                  ) : alert.type === 'Missing Person' ? (
                    <Users className="w-4.5 h-4.5 text-amber-500" />
                  ) : (
                    <Bell className="w-4.5 h-4.5 text-indigo-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider">{alert.type}</span>
                    <span className="text-[9px] bg-slate-950/80 px-1.5 py-0.5 rounded font-mono font-bold text-slate-400 border border-slate-900">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-normal">{alert.title}</p>
                  <span className="text-[10px] text-slate-500 block pt-0.5">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch Guidelines Panel */}
        <div className="bg-slate-950/20 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Operational Protocol</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex gap-2">
                <span className="text-rose-500 font-bold">01.</span>
                <span>Verify report integrity prior to broadcasting critical alerts.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold">02.</span>
                <span>Active Threat dispatches trigger automated SMS/Push to nearby users.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">03.</span>
                <span>Ensure physical landmarks are clearly written in description details.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl mt-6">
            <div className="flex items-center gap-2 text-rose-500 text-xs font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Warning: Community broadcasts cannot be retracted.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Alert Modal */}
      <AnimatePresence>
        {showBroadcastModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Radio className="w-5 h-5 text-rose-500" />
                  <span>Dispatch Emergency Alert</span>
                </h3>
                <button onClick={() => setShowBroadcastModal(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Alert Heading</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="e.g. Amber Alert: Marcus Miller (8yo), last seen..."
                    className="mt-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Alert Type</label>
                    <select
                      value={broadcastType}
                      onChange={(e) => setBroadcastType(e.target.value as any)}
                      className="mt-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Active Threat">Active Threat</option>
                      <option value="Missing Person">Missing Person</option>
                      <option value="High-Priority Alert">High-Priority Alert</option>
                      <option value="Broadcasting Alert">General Warning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity</label>
                    <select
                      value={broadcastSeverity}
                      onChange={(e) => setBroadcastSeverity(e.target.value as any)}
                      className="mt-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowBroadcastModal(false)}
                    className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-950 font-bold transition-all text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-500 px-5 py-2 rounded-lg text-white font-bold transition-all text-xs flex items-center gap-1.5"
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
