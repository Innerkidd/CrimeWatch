import { motion } from 'framer-motion';
import { Phone, Eye, MapPin, Users, AlertTriangle } from 'lucide-react';

const tips = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Emergency Contacts',
    description:
      'Save emergency numbers: Police 100, Ambulance 108, Fire 101. Keep them accessible at all times.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Stay Alert',
    description:
      'Be aware of your surroundings, especially in crowded places. Trust your instincts and avoid poorly lit areas.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Report Suspicious Activity',
    description:
      'If you see something suspicious, report it immediately. Your vigilance helps prevent crimes.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Share Live Location',
    description:
      'Share your live location with trusted contacts when traveling alone, especially at night.',
    color: 'from-purple-500 to-violet-500',
  },
];

export const SafetyTips = () => {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-slate-300">
              Stay Safe
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Safety <span className="gradient-text">Tips</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Essential safety guidelines to protect yourself and your community.
          </p>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="glass rounded-2xl p-6 h-full hover:bg-white/[0.06] transition-all duration-300 group hover:-translate-y-1">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyTips;
