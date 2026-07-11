import { motion } from 'framer-motion';
import { FileText, MapPin, Navigation, Clock, User, RefreshCw } from 'lucide-react';
import { type CrimeDetail } from '../data/mockData';

interface IncidentDetailsProps {
  crime: CrimeDetail;
}

export const IncidentDetails = ({ crime }: IncidentDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass rounded-2xl p-6"
    >
      <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
        <FileText className="w-5 h-5 text-blue-400" />
        Incident Details
      </h2>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-400 mb-2">Description</h3>
        <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] border border-white/5 rounded-xl p-4">
          {crime.description}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: MapPin, label: 'Address', value: crime.location, color: 'text-emerald-400' },
          { icon: Navigation, label: 'GPS Coordinates', value: `${crime.lat.toFixed(6)}, ${crime.lng.toFixed(6)}`, color: 'text-blue-400' },
          { icon: Clock, label: 'Date & Time', value: `${crime.date} at ${crime.time}`, color: 'text-amber-400' },
          { icon: User, label: 'Reporter Type', value: crime.reporterType === 'anonymous' ? 'Anonymous Citizen' : crime.reporterType === 'citizen' ? 'Registered Citizen' : 'Law Enforcement', color: 'text-violet-400' },
          { icon: RefreshCw, label: 'Last Updated', value: crime.lastUpdated, color: 'text-slate-400' },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className={`mt-0.5 ${item.color}`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="text-sm text-white font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IncidentDetails;
