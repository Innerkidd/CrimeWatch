import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, KeyRound } from 'lucide-react';
import { DEMO_CREDENTIALS, type UserRole } from '../services/mockAuth';

interface DemoCredentialsCardProps {
  role: UserRole;
}

const roleConfig = {
  citizen: { label: 'Citizen', color: 'text-cyber-cyan glow-cyan', bg: 'bg-cyber-cyan/5', border: 'border-cyber-cyan/20' },
  police: { label: 'Police', color: 'text-cyber-yellow glow-yellow', bg: 'bg-cyber-yellow/5', border: 'border-cyber-yellow/20' },
  admin: { label: 'Admin', color: 'text-cyber-pink glow-pink', bg: 'bg-cyber-pink/5', border: 'border-cyber-pink/20' },
};

export const DemoCredentialsCard = ({ role }: DemoCredentialsCardProps) => {
  const [copied, setCopied] = useState(false);
  const creds = DEMO_CREDENTIALS[role];
  const config = roleConfig[role];

  const handleCopy = async () => {
    const text = `Email: ${creds.email}\nPassword: ${creds.password}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`rounded-none border ${config.border} ${config.bg} p-4 font-tech relative`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <KeyRound className={`w-4 h-4 ${config.color}`} />
          <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
            // DEMO_{config.label.toUpperCase()}_CREDS
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-none text-[9px] font-bold text-slate-400 hover:text-white bg-white/5 border border-white/10 hover:border-cyber-cyan/35 transition-all cursor-pointer uppercase tracking-wider"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-cyber-green glow-green animate-pulse" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="space-y-1.5 text-[11px] uppercase tracking-wide">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 w-16">EMAIL:</span>
          <span className="text-white font-mono lowercase">{creds.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 w-16">PASSWORD:</span>
          <span className="text-white font-mono">{creds.password}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoCredentialsCard;
