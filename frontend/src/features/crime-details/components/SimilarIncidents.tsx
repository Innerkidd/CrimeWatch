import { motion } from 'framer-motion';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { type SimilarIncident, crimeTypeLabels, severityConfig, statusConfig } from '../data/mockData';

interface SimilarIncidentsProps {
  incidents: SimilarIncident[];
}

export const SimilarIncidents = ({ incidents }: SimilarIncidentsProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass rounded-2xl p-6"
    >
      <h2 className="text-lg font-bold text-white mb-5">Similar Nearby Incidents</h2>

      <div className="space-y-3">
        {incidents.map((incident, i) => {
          const sev = severityConfig[incident.severity];
          const stat = statusConfig[incident.status];

          return (
            <motion.button
              key={incident.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              onClick={() => navigate(`/crime/${incident.id}`)}
              className="w-full text-left p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {incident.title}
                    </h4>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${sev.bg} ${sev.color}`}>
                      {sev.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {incident.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {incident.date}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${stat.bg} ${stat.color}`}>
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{crimeTypeLabels[incident.type]}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors mt-1" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SimilarIncidents;
