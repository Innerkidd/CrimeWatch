import { motion } from 'framer-motion';
import {
  Radio,
  Map,
  MapPin,
  EyeOff,
  Bell,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: <Radio className="w-6 h-6" />,
    title: 'Real-Time Crime Reporting',
    description:
      'Report incidents instantly with photo and video evidence. Your report reaches authorities within seconds.',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: <Map className="w-6 h-6" />,
    title: 'Interactive Crime Map',
    description:
      'Visualize crime data on an interactive heatmap. Identify hotspots and stay aware of your surroundings.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'GPS Location Detection',
    description:
      'Automatic location detection ensures accurate incident reporting without manual address entry.',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    icon: <EyeOff className="w-6 h-6" />,
    title: 'Anonymous Reporting',
    description:
      'Report crimes without revealing your identity. Complete anonymity protection for sensitive cases.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Instant Notifications',
    description:
      'Receive real-time alerts about crimes in your area. Stay informed with customizable notification preferences.',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Police Collaboration',
    description:
      'Direct communication channel with local law enforcement. Track investigation progress in real-time.',
    gradient: 'from-indigo-500 to-blue-500',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-20 lg:py-28">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Everything you need to report, track, and prevent crime in your
            community.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="glass rounded-2xl p-6 h-full hover:bg-white/[0.06] transition-all duration-300 group hover:-translate-y-1">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
