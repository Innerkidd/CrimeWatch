import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, MapPin, AlertTriangle, Users, Radio, ShieldCheck } from 'lucide-react';

const floatingIcons = [
  { Icon: MapPin, x: '10%', y: '20%', delay: 0, color: 'text-red-400' },
  { Icon: AlertTriangle, x: '80%', y: '15%', delay: 0.3, color: 'text-amber-400' },
  { Icon: Users, x: '75%', y: '70%', delay: 0.6, color: 'text-blue-400' },
  { Icon: Radio, x: '15%', y: '75%', delay: 0.9, color: 'text-emerald-400' },
  { Icon: ShieldCheck, x: '50%', y: '45%', delay: 1.2, color: 'text-violet-400' },
];

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Left Panel - Illustration (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-950 to-blue-950/30">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, x, y, delay, color }, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.6, type: 'spring' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="p-3 rounded-xl glass">
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-md"
          >
            {/* Shield Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="relative inline-flex items-center justify-center mb-8"
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-600/30">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <motion.div
                className="absolute inset-0 border-2 border-blue-500/30 rounded-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight">
              Welcome to{' '}
              <span className="gradient-text">CrimeWatch</span>
            </h1>
            <p className="text-slate-400 leading-relaxed mb-8">
              Empowering communities to report, track, and prevent crime.
              Together, we build safer neighborhoods through real-time
              collaboration.
            </p>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-8">
              {[
                { value: '50K+', label: 'Reports Filed' },
                { value: '200+', label: 'Cities' },
                { value: '98%', label: 'Verified' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-center py-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-wider">
              <span className="text-white">CRIME</span>
              <span className="text-blue-400">WATCH</span>
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[440px]"
          >
            <Outlet />
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>&copy; {new Date().getFullYear()} CrimeWatch. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
