import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, Shield, Radio, ArrowRight } from 'lucide-react';

const floatingPins = [
  { x: '15%', y: '30%', delay: 0, color: 'text-red-500' },
  { x: '75%', y: '25%', delay: 0.3, color: 'text-amber-500' },
  { x: '60%', y: '60%', delay: 0.6, color: 'text-emerald-500' },
  { x: '30%', y: '65%', delay: 0.9, color: 'text-red-500' },
  { x: '85%', y: '55%', delay: 1.2, color: 'text-emerald-500' },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-cyan/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyber-pink/5 rounded-full blur-3xl" />

      {/* Floating Map Illustration */}
      <div className="absolute inset-0 hidden lg:block">
        {/* Grid Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(0,212,255,0.06)" strokeWidth="1" />
          <line x1="40%" y1="0" x2="40%" y2="100%" stroke="rgba(0,212,255,0.04)" strokeWidth="1" />
          <line x1="60%" y1="0" x2="60%" y2="100%" stroke="rgba(0,212,255,0.06)" strokeWidth="1" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(0,212,255,0.04)" strokeWidth="1" />
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="rgba(0,212,255,0.04)" strokeWidth="1" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(0,212,255,0.06)" strokeWidth="1" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="rgba(0,212,255,0.04)" strokeWidth="1" />
        </svg>

        {/* Floating Location Pins */}
        {floatingPins.map((pin, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: pin.x, top: pin.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: pin.delay + 1, duration: 0.5, type: 'spring' }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MapPin className={`w-7 h-7 ${pin.color.replace('red-550', 'cyber-pink').replace('emerald-500', 'cyber-green').replace('red-500', 'cyber-pink').replace('amber-500', 'cyber-yellow')} drop-shadow-[0_0_10px_rgba(0,212,255,0.4)]`} />
            </motion.div>
          </motion.div>
        ))}

        {/* Shield Icon */}
        <motion.div
          className="absolute top-1/3 right-[15%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Shield className="w-32 h-32 text-cyber-cyan glow-cyan" />
        </motion.div>

        {/* Alert Pulse */}
        <motion.div
          className="absolute bottom-[30%] left-[12%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="relative">
            <Radio className="w-8 h-8 text-cyber-pink glow-pink" />
            <motion.div
              className="absolute inset-0 border-2 border-cyber-pink/30 rounded-full"
              animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-cyber-pink/30 bg-cyber-pink/15 text-cyber-pink font-tech uppercase tracking-wider glow-pink mb-8"
          >
            <AlertTriangle className="w-4 h-4 text-cyber-pink glow-pink animate-pulse" />
            <span>
              SECURE_LINK: Real-Time Crime Reporting
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider leading-[1.05] mb-6 font-orbitron">
            <span className="text-white">Report Crimes.</span>
            <br />
            <span className="text-white">Stay Informed.</span>
            <br />
            <span className="gradient-text glow-cyan">SECURE_COMMUNITY.</span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          >
            Empowering citizens with a real-time platform to report incidents, track
            crime trends, and collaborate with law enforcement to build safer
            neighborhoods.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/reports"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-cyber-pink hover:bg-cyber-pink/90 text-white font-semibold font-tech tracking-wide rounded-none transition-all duration-300 shadow-[0_0_15px_rgba(255,0,119,0.35)] hover:shadow-[0_0_20px_rgba(255,0,119,0.5)] chamfer-button"
            >
              <AlertTriangle className="w-5 h-5 text-white" />
              REPORT_CRIME_INIT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/map"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-cyber-cyan/5 border border-cyber-cyan/40 hover:bg-cyber-cyan/15 text-cyber-cyan font-semibold font-tech tracking-wide rounded-none transition-all duration-300 shadow-[0_0_10px_rgba(0,212,255,0.1)] hover:shadow-[0_0_15px_rgba(0,212,255,0.25)] chamfer-button"
            >
              <MapPin className="w-5 h-5 text-cyber-cyan glow-cyan" />
              TACTICAL_LIVE_MAP
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-void to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
