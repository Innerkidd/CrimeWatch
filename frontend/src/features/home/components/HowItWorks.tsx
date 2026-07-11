import { motion } from 'framer-motion';
import { FileWarning, ShieldCheck, Siren, BellRing } from 'lucide-react';

const steps = [
  {
    icon: <FileWarning className="w-7 h-7 text-cyber-pink" />,
    title: 'Report Incident',
    description: 'Submit a crime report with details, photos, and location data.',
    colorClass: 'text-cyber-pink',
    borderClass: 'border-cyber-pink/40 shadow-[0_0_12px_rgba(255,0,119,0.25)]',
    glowClass: 'glow-pink',
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-cyber-yellow" />,
    title: 'Verification',
    description: 'Our team and AI system verify the report for authenticity.',
    colorClass: 'text-cyber-yellow',
    borderClass: 'border-cyber-yellow/40 shadow-[0_0_12px_rgba(255,179,0,0.25)]',
    glowClass: 'glow-yellow',
  },
  {
    icon: <Siren className="w-7 h-7 text-cyber-cyan" />,
    title: 'Police Action',
    description: 'Verified reports are dispatched to local law enforcement.',
    colorClass: 'text-cyber-cyan',
    borderClass: 'border-cyber-cyan/40 shadow-[0_0_12px_rgba(0,212,255,0.25)]',
    glowClass: 'glow-cyan',
  },
  {
    icon: <BellRing className="w-7 h-7 text-cyber-green" />,
    title: 'Community Updates',
    description: 'Track the investigation and receive real-time status updates.',
    colorClass: 'text-cyber-green',
    borderClass: 'border-cyber-green/40 shadow-[0_0_12px_rgba(0,255,136,0.25)]',
    glowClass: 'glow-green',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white mb-3 font-orbitron">
            OPERATIONS <span className="gradient-text glow-cyan">PIPELINE</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto font-tech uppercase text-xs tracking-wide">
            // Sequential workflow for processing emergency signals.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting Line (desktop) */}
          <div className="hidden lg:block absolute top-[30px] left-[12.5%] right-[12.5%] h-0.5 border-t border-dashed border-cyber-cyan/30 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative text-center z-10"
            >
              {/* Step Number Circle */}
              <div className="relative mx-auto w-14 h-14 mb-6">
                <div
                  className={`absolute inset-0 bg-cyber-void border-2 ${step.borderClass} rounded-lg rotate-45`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              {/* Step Number */}
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-tech mb-2">
                // PHASE_0{i + 1}
              </div>

              {/* Content */}
              <h3 className={`text-sm font-bold uppercase tracking-wider font-orbitron mb-2 ${step.colorClass} ${step.glowClass}`}>
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-tech uppercase tracking-wide max-w-xs mx-auto">
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
