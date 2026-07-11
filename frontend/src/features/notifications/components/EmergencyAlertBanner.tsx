import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MapPin, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { type EmergencyAlert } from '../data/mockData';

interface EmergencyAlertBannerProps {
  alert: EmergencyAlert;
}

export const EmergencyAlertBanner = ({ alert }: EmergencyAlertBannerProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      className="relative rounded-2xl overflow-hidden border border-red-500/30"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-red-500/10 to-orange-500/20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIi8+PC9zdmc+')] opacity-50" />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Pulsing alert icon */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-xl bg-red-500/20"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 border border-red-500/30 text-red-400 uppercase tracking-wider">
                  Emergency Alert
                </span>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-red-500"
                />
              </div>

              <h3 className="text-base font-bold text-white mb-1">{alert.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">{alert.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  {alert.affectedArea}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Issued: {new Date(alert.issuedAt).toLocaleTimeString()}
                </span>
                {alert.expiresAt && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Expires: {new Date(alert.expiresAt).toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Emergency Contact Button */}
        <div className="mt-4 flex items-center gap-3">
          <a
            href={`tel:${alert.contactNumber}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-sm font-semibold text-red-400 hover:bg-red-500/30 transition-all"
          >
            <Phone className="w-4 h-4" />
            Call {alert.contactNumber}
          </a>
          <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-all">
            View Affected Area
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyAlertBanner;
