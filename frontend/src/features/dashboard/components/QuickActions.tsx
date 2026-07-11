import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Map, FileText, Phone } from 'lucide-react';

const actions = [
  {
    icon: AlertTriangle,
    label: 'Report Crime',
    description: 'Submit a new incident report instantly',
    href: '/reports',
    glowClass: 'glow-pink',
    textClass: 'text-cyber-pink',
    borderClass: 'border-cyber-pink/20 hover:border-cyber-pink/45 hover:shadow-[0_0_15px_rgba(255,0,119,0.15)]',
    iconBg: 'bg-cyber-pink/10 border border-cyber-pink/20',
  },
  {
    icon: Map,
    label: 'View Live Map',
    description: 'Explore real-time crime data on the map',
    href: '/map',
    glowClass: 'glow-cyan',
    textClass: 'text-cyber-cyan',
    borderClass: 'border-cyber-cyan/20 hover:border-cyber-cyan/45 hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]',
    iconBg: 'bg-cyber-cyan/10 border border-cyber-cyan/20',
  },
  {
    icon: FileText,
    label: 'My Reports',
    description: 'Track your submitted reports and status',
    href: '/my-reports',
    glowClass: 'glow-yellow',
    textClass: 'text-cyber-yellow',
    borderClass: 'border-cyber-yellow/20 hover:border-cyber-yellow/45 hover:shadow-[0_0_15px_rgba(255,179,0,0.15)]',
    iconBg: 'bg-cyber-yellow/10 border border-cyber-yellow/20',
  },
  {
    icon: Phone,
    label: 'Emergency Contacts',
    description: 'Quick access to emergency contacts',
    href: '/dashboard',
    glowClass: 'glow-green',
    textClass: 'text-cyber-green',
    borderClass: 'border-cyber-green/20 hover:border-cyber-green/45 hover:shadow-[0_0_15px_rgba(0,255,136,0.15)]',
    iconBg: 'bg-cyber-green/10 border border-cyber-green/20',
  },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          onClick={() => navigate(action.href)}
          className={`hud-panel chamfer-button p-5 text-left transition-all duration-350 cursor-pointer ${action.borderClass}`}
        >
          {/* HUD Corner Brackets */}
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${action.iconBg} mb-4 group-hover:scale-105 transition-transform duration-300`}>
            <action.icon className={`w-6 h-6 ${action.textClass} ${action.glowClass}`} />
          </div>
          <h3 className={`text-sm font-bold uppercase tracking-wider font-orbitron mb-1 ${action.textClass} ${action.glowClass}`}>
            {action.label}
          </h3>
          <p className="text-[11px] font-tech uppercase tracking-wide text-slate-400 leading-normal">
            {action.description}
          </p>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
