import { motion } from 'framer-motion';
import { FileWarning, ShieldCheck, Siren, BellRing } from 'lucide-react';

const steps = [
  {
    icon: <FileWarning className="w-7 h-7" />,
    title: 'Report Incident',
    description: 'Submit a crime report with details, photos, and location data.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: 'Verification',
    description: 'Our team and AI system verify the report for authenticity.',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: <Siren className="w-7 h-7" />,
    title: 'Police Action',
    description: 'Verified reports are dispatched to local law enforcement.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <BellRing className="w-7 h-7" />,
    title: 'Community Updates',
    description: 'Track the investigation and receive real-time status updates.',
    color: 'from-emerald-500 to-green-500',
  },
];

export const HowItWorks = () => {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            A simple four-step process to report crimes and keep your community
            safe.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting Line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-red-500/50 via-amber-500/50 to-emerald-500/50" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative text-center"
            >
              {/* Step Number Circle */}
              <div className="relative mx-auto w-14 h-14 mb-6">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl rotate-45 shadow-lg`}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  {step.icon}
                </div>
              </div>

              {/* Step Number */}
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Step {i + 1}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
