import { motion } from 'framer-motion';
import { Shield, Phone, AlertTriangle, BookOpen, HelpCircle } from 'lucide-react';

const guidelines = [
  'Provide accurate and detailed information.',
  'Upload photos or videos if available.',
  'Do not touch or move evidence.',
  'Stay safe — do not confront suspects.',
  'Reports are reviewed within 24 hours.',
];

const emergencyNumbers = [
  { label: 'Police', number: '100' },
  { label: 'Ambulance', number: '108' },
  { label: 'Fire', number: '101' },
  { label: 'Women Helpline', number: '1091' },
  { label: 'Cyber Crime', number: '1930' },
];

const safetyTips = [
  'Always be aware of your surroundings.',
  'Share your location with trusted contacts.',
  'Avoid walking alone at night.',
  'Keep emergency contacts saved on your phone.',
];

const faqs = [
  { q: 'Can I report anonymously?', a: 'Yes. Check the anonymous option and no personal info will be collected.' },
  { q: 'How long does verification take?', a: 'Reports are typically verified within 24-48 hours.' },
  { q: 'Will I get updates?', a: 'Yes, you will receive notifications about your report status.' },
];

export const SidebarInfo = () => {
  return (
    <div className="space-y-4">
      {/* Reporting Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-bold text-white">Reporting Guidelines</h3>
        </div>
        <ul className="space-y-2">
          {guidelines.map((g, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="text-blue-400 mt-0.5">•</span>
              {g}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Phone className="w-5 h-5 text-red-400" />
          <h3 className="text-sm font-bold text-white">Emergency Contacts</h3>
        </div>
        <div className="space-y-2">
          {emergencyNumbers.map((e) => (
            <div key={e.label} className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{e.label}</span>
              <span className="font-semibold text-white font-mono">{e.number}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Safety Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Safety Tips</h3>
        </div>
        <ul className="space-y-2">
          {safetyTips.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 mt-0.5">•</span>
              {t}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white">FAQ</h3>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i}>
              <p className="text-xs font-semibold text-white mb-0.5">{f.q}</p>
              <p className="text-[11px] text-slate-400">{f.a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl p-4 bg-red-500/10 border border-red-500/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-sm font-bold text-red-400">Emergency?</h3>
        </div>
        <p className="text-xs text-red-300/80 leading-relaxed">
          If this is an emergency, immediately contact your local emergency services at{' '}
          <span className="font-bold text-red-400">100</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default SidebarInfo;
