import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight, AlertTriangle, Shield, Eye } from 'lucide-react';

interface CrimeAlert {
  id: string;
  type: string;
  location: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
  status: 'reported' | 'investigating' | 'resolved';
}

const alerts: CrimeAlert[] = [
  {
    id: 'ALRT-9921',
    type: 'Armed Robbery',
    location: '142 Main Street, Downtown',
    time: '15 mins ago',
    severity: 'high',
    status: 'investigating',
  },
  {
    id: 'ALRT-8843',
    type: 'Vehicle Theft',
    location: '78 Oak Avenue, Midtown',
    time: '1 hour ago',
    severity: 'medium',
    status: 'reported',
  },
  {
    id: 'ALRT-7731',
    type: 'Vandalism',
    location: '320 Pine Road, Eastside',
    time: '2 hours ago',
    severity: 'low',
    status: 'resolved',
  },
  {
    id: 'ALRT-6512',
    type: 'Burglary',
    location: '15 Cedar Lane, Westend',
    time: '3 hours ago',
    severity: 'medium',
    status: 'investigating',
  },
];

const severityStyles = {
  high: 'bg-cyber-pink/10 text-cyber-pink border-cyber-pink/25 glow-pink',
  medium: 'bg-cyber-yellow/10 text-cyber-yellow border-cyber-yellow/25 glow-yellow',
  low: 'bg-cyber-green/10 text-cyber-green border-cyber-green/25 glow-green',
};

const statusStyles = {
  reported: 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/25 glow-cyan',
  investigating: 'bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/25 glow-yellow',
  resolved: 'bg-cyber-green/10 text-cyber-green border border-cyber-green/25 glow-green',
};

const severityIcons = {
  high: <AlertTriangle className="w-3 h-3" />,
  medium: <Shield className="w-3 h-3" />,
  low: <Eye className="w-3 h-3" />,
};

export const NearbyAlerts = () => {
  return (
    <div className="hud-panel border border-cyber-cyan/15 bg-cyber-void/85 relative transition-all duration-300">
      {/* HUD Brackets Corners */}
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />

      <div className="px-5 py-4 border-b border-cyber-cyan/15 flex items-center justify-between font-tech relative z-10">
        <h3 className="text-sm font-bold text-cyber-cyan glow-cyan uppercase font-orbitron tracking-wider">NEARBY_THREAT_FEEDS</h3>
        <button className="text-[10px] font-bold text-cyber-cyan hover:text-cyber-green transition-colors flex items-center gap-1 uppercase tracking-wider cursor-pointer">
          VIEW_ALL <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="divide-y divide-cyber-cyan/10 relative z-10">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="px-5 py-4 hover:bg-cyber-cyan/5 transition-colors text-left"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-xs font-bold text-white font-orbitron uppercase tracking-wide">{alert.type}</h4>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-tech font-bold uppercase tracking-widest border rounded-none ${severityStyles[alert.severity]}`}>
                    {severityIcons[alert.severity]}
                    {alert.severity}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-tech uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyber-cyan glow-cyan" />
                    LOC: {alert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyber-cyan glow-cyan" />
                    TIME: {alert.time}
                  </span>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 text-[9px] font-tech uppercase tracking-widest rounded-none ${statusStyles[alert.status]}`}>
                {alert.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NearbyAlerts;
