import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Shield } from 'lucide-react';

export const WelcomeSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || user.email?.split('@')[0] || 'User';

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hud-panel p-6 lg:p-8 hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.08)] transition-all"
    >
      {/* HUD Brackets Corners */}
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-wider text-white mb-1 font-orbitron">
            {greeting()}, <span className="gradient-text glow-cyan">{userName}</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-tech uppercase tracking-wide">
            // TELEMETRY ACTIVE. Your reports secure the grid.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-tech uppercase tracking-wider text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyber-cyan glow-cyan" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyber-cyan glow-cyan" />
            <span className="glow-cyan">{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyber-green glow-green" />
            <span className="text-cyber-green glow-green">NODE_METRO_CITY</span>
          </div>
        </div>
      </div>

      {/* Safety Message */}
      <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-cyber-green/5 border border-cyber-green/30 text-cyber-green glow-green font-tech uppercase text-xs tracking-wider">
        <Shield className="w-5 h-5 text-cyber-green flex-shrink-0 animate-pulse" />
        <p className="leading-relaxed">
          <span className="font-bold">// BROADCAST_ALERT:</span> ALWAYS OBSERVE GRID SECTOR SURROUNDINGS. SUBMIT SUSPICIOUS ACTIVITY SIGNALS IMMEDIATELY.
        </p>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;
