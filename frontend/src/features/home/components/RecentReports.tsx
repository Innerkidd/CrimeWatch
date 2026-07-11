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
    id: '1',
    type: 'Armed Robbery',
    location: '142 Main Street, Downtown',
    time: '2 hours ago',
    status: 'investigating',
  },
  {
    id: '2',
    type: 'Vehicle Theft',
    location: '78 Oak Avenue, Midtown',
    time: '4 hours ago',
    status: 'verified',
  },
  {
    id: '3',
    type: 'Assault',
    location: '320 Pine Road, Eastside',
    time: '6 hours ago',
    status: 'pending',
  },
  {
    id: '4',
    type: 'Burglary',
    location: '15 Cedar Lane, Westend',
    time: '8 hours ago',
    status: 'resolved',
  },
];

const statusStyles: Record<string, string> = {
  verified: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  investigating: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  resolved: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Recent Crime <span className="gradient-text">Reports</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Stay informed about recent incidents reported in your area.
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
              <div className="glass rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {report.type}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border capitalize ${
                      statusStyles[report.status]
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    {report.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4 text-slate-500" />
                    {report.time}
                  </div>
                </div>

                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/btn">
                  <Eye className="w-4 h-4" />
                  View Details
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
