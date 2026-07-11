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
    id: '1',
    type: 'Armed Robbery',
    location: '142 Main Street, Downtown',
    time: '15 mins ago',
    severity: 'high',
    status: 'investigating',
  },
  {
    id: '2',
    type: 'Vehicle Theft',
    location: '78 Oak Avenue, Midtown',
    time: '1 hour ago',
    severity: 'medium',
    status: 'reported',
  },
  {
    id: '3',
    type: 'Vandalism',
    location: '320 Pine Road, Eastside',
    time: '2 hours ago',
    severity: 'low',
    status: 'resolved',
  },
  {
    id: '4',
    type: 'Burglary',
    location: '15 Cedar Lane, Westend',
    time: '3 hours ago',
    severity: 'medium',
    status: 'investigating',
  },
];

const severityStyles = {
  high: 'bg-red-500/15 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
};

const statusStyles = {
  reported: 'bg-blue-500/15 text-blue-400',
  investigating: 'bg-amber-500/15 text-amber-400',
  resolved: 'bg-emerald-500/15 text-emerald-400',
};

const severityIcons = {
  high: <AlertTriangle className="w-3.5 h-3.5" />,
  medium: <Shield className="w-3.5 h-3.5" />,
  low: <Eye className="w-3.5 h-3.5" />,
};

export const NearbyAlerts = () => {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Nearby Crime Alerts</h3>
        <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
          View All <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="divide-y divide-white/5">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="px-5 py-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-sm font-semibold text-white">{alert.type}</h4>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full border ${severityStyles[alert.severity]}`}>
                    {severityIcons[alert.severity]}
                    {alert.severity}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {alert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </span>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusStyles[alert.status]}`}>
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
