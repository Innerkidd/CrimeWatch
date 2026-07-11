import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, Shield, Radio, ArrowRight, Users, BadgeCheck, Settings } from 'lucide-react';

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-3xl" />

      {/* Floating Map Illustration */}
      <div className="absolute inset-0 hidden lg:block">
        {/* Grid Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
          <line x1="40%" y1="0" x2="40%" y2="100%" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
          <line x1="60%" y1="0" x2="60%" y2="100%" stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
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
              <MapPin className={`w-7 h-7 ${pin.color} drop-shadow-lg`} />
            </motion.div>
          </motion.div>
        ))}

        {/* Shield Icon */}
        <motion.div
          className="absolute top-1/3 right-[15%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Shield className="w-32 h-32 text-blue-500" />
        </motion.div>

        {/* Alert Pulse */}
        <motion.div
          className="absolute bottom-[30%] left-[12%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="relative">
            <Radio className="w-8 h-8 text-red-500" />
            <motion.div
              className="absolute inset-0 border-2 border-red-500/30 rounded-full"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-slate-300">
              Real-Time Crime Reporting Platform
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="text-white">Report Crimes.</span>
            <br />
            <span className="text-white">Stay Informed.</span>
            <br />
            <span className="gradient-text">Keep Your Community Safe.</span>
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

          {/* CTA Buttons — Three Login Portals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Citizen Login */}
            <Link
              to="/login"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-105"
            >
              <Users className="w-5 h-5" />
              Citizen Login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Police Login */}
            <Link
              to="/police/login"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/25 hover:shadow-amber-500/40 hover:scale-105"
            >
              <BadgeCheck className="w-5 h-5" />
              Police Portal
            </Link>

            {/* Admin Login */}
            <Link
              to="/admin/login"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-500/40 hover:scale-105"
            >
              <Settings className="w-5 h-5" />
              Admin Portal
            </Link>
          </motion.div>

          {/* Quick Map Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6"
          >
            <Link
              to="/map"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <MapPin className="w-4 h-4" />
              View Live Crime Map (Public)
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  );
};

export default HeroSection;
