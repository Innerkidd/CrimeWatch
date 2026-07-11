import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Users, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden hud-panel border border-cyber-cyan/25 hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.08)] transition-all duration-300"
        >
          {/* HUD Brackets Corners */}
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />

          {/* Background Glows */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-cyber-void/80 to-cyber-pink/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyber-pink/5 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative px-8 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-[10px] font-bold text-cyber-pink font-tech tracking-widest uppercase block mb-4">// CRITICAL_BROADCAST</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider text-white mb-4 leading-tight font-orbitron">
                SECURE YOUR
                <br />
                <span className="gradient-text glow-cyan">LOCAL_SECTOR</span>
              </h2>
              <p className="text-xs text-slate-400 font-tech uppercase tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
                Join thousands of local nodes collaborating to secure neighborhoods. 
                Every report adds telemetry data. Every sentinel counts.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/reports"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-cyber-pink hover:bg-cyber-pink/90 text-white font-semibold font-tech tracking-wide rounded-none transition-all duration-300 shadow-[0_0_12px_rgba(255,0,119,0.3)] chamfer-button"
                >
                  <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
                  INITIATE_REPORT
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-cyber-cyan hover:bg-cyber-green text-cyber-void font-semibold font-tech tracking-wide rounded-none transition-all duration-300 shadow-[0_0_12px_rgba(0,212,255,0.3)] chamfer-button"
                >
                  <Users className="w-5 h-5 text-cyber-void" />
                  JOIN_MAIN_GRID
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
