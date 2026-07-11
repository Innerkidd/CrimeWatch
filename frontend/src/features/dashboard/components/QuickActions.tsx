import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Map, FileText, Phone } from 'lucide-react';

const actions = [
  {
    icon: AlertTriangle,
    label: 'Report Crime',
    description: 'Submit a new incident report instantly',
    href: '/reports',
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-500/10 border-red-500/20',
  },
  {
    icon: Map,
    label: 'View Live Map',
    description: 'Explore real-time crime data on the map',
    href: '/map',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: FileText,
    label: 'My Reports',
    description: 'Track your submitted reports and status',
    href: '/my-reports',
    color: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Phone,
    label: 'Emergency',
    description: 'Quick access to emergency contacts',
    href: '/dashboard',
    color: 'from-emerald-500 to-green-500',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
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
          className={`group glass rounded-2xl p-5 text-left hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1`}
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {action.label}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {action.description}
          </p>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
