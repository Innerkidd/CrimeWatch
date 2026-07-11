import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, KeyRound } from 'lucide-react';
import { DEMO_CREDENTIALS, type UserRole } from '../services/mockAuth';

interface DemoCredentialsCardProps {
  role: UserRole;
}

const roleConfig = {
  citizen: { label: 'Citizen', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  police: { label: 'Police', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  admin: { label: 'Admin', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
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
      className={`rounded-xl border ${config.border} ${config.bg} p-4`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <KeyRound className={`w-4 h-4 ${config.color}`} />
          <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
            Demo {config.label} Credentials
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 w-16">Email:</span>
          <span className="text-white font-mono">{creds.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 w-16">Password:</span>
          <span className="text-white font-mono">{creds.password}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoCredentialsCard;
