import { motion } from 'framer-motion';
import { MapPin, Clock, Eye, ChevronRight } from 'lucide-react';

interface CrimeReport {
  id: string;
  type: string;
  location: string;
  time: string;
  status: 'verified' | 'pending' | 'investigating' | 'resolved';
}

const reports: CrimeReport[] = [
  {
    id: 'INC-9912',
    type: 'Armed Robbery',
    location: '142 Main Street, Downtown',
    time: '2 hours ago',
    status: 'investigating',
  },
  {
    id: 'INC-8831',
    type: 'Vehicle Theft',
    location: '78 Oak Avenue, Midtown',
    time: '4 hours ago',
    status: 'verified',
  },
  {
    id: 'INC-7729',
    type: 'Assault',
    location: '320 Pine Road, Eastside',
    time: '6 hours ago',
    status: 'pending',
  },
  {
    id: 'INC-6520',
    type: 'Burglary',
    location: '15 Cedar Lane, Westend',
    time: '8 hours ago',
    status: 'resolved',
  },
];

const statusStyles: Record<string, string> = {
  verified: 'bg-cyber-green/10 text-cyber-green border-cyber-green/30 glow-green',
  pending: 'bg-cyber-yellow/10 text-cyber-yellow border-cyber-yellow/30 glow-yellow',
  investigating: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30 glow-cyan',
  resolved: 'bg-navy-900 text-slate-500 border-slate-800',
};

export const RecentReports = () => {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white mb-3 font-orbitron">
            RECENT <span className="gradient-text glow-cyan">INCIDENT LOGS</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto font-tech uppercase text-xs tracking-wide">
            // Active telemetry broadcast of reported grid activities.
          </p>
        </motion.div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="hud-panel p-6 hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.08)] transition-all duration-300 group">
                {/* HUD Brackets Corners */}
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-tech text-slate-500 block mb-0.5">// LOG_ID: {report.id}</span>
                    <h3 className="text-base font-bold uppercase tracking-wider text-white font-orbitron group-hover:text-cyber-cyan group-hover:glow-cyan transition-colors">
                      {report.type}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-tech uppercase tracking-wide border rounded-none ${
                      statusStyles[report.status]
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="space-y-1.5 mb-5 font-tech text-xs uppercase tracking-wide">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 text-cyber-cyan glow-cyan" />
                    <span>LOC: {report.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-cyber-cyan glow-cyan" />
                    <span>TIME: {report.time}</span>
                  </div>
                </div>

                <button className="inline-flex items-center gap-1.5 text-xs font-bold font-tech uppercase tracking-wide text-cyber-cyan hover:text-cyber-green transition-colors group/btn">
                  <Eye className="w-4 h-4" />
                  INIT_DATA_DECRYPT
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentReports;
