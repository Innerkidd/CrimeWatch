import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, Laptop, Smartphone, Tablet, LogOut } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';
import { type ActiveSession } from '../data/mockData';

interface SecuritySettingsProps {
  sessions: ActiveSession[];
  onLogoutAll: () => void;
  onPasswordChange: (data: { current: string; newPass: string }) => void;
}

const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-orange-500' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-amber-500' };
  if (score <= 4) return { score, label: 'Strong', color: 'bg-emerald-500' };
  return { score, label: 'Very Strong', color: 'bg-emerald-400' };
};

const deviceIcons: Record<string, typeof Laptop> = {
  MacBook: Laptop,
  iPhone: Smartphone,
  iPad: Tablet,
};

export const SecuritySettings = ({ sessions, onLogoutAll, onPasswordChange }: SecuritySettingsProps) => {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const [passError, setPassError] = useState('');

  const strength = getPasswordStrength(newPass);

  const handlePasswordSubmit = () => {
    setPassError('');
    if (!currentPass || !newPass) {
      setPassError('Please fill in all fields.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('New passwords do not match.');
      return;
    }
    if (newPass.length < 8) {
      setPassError('Password must be at least 8 characters.');
      return;
    }
    onPasswordChange({ current: currentPass, newPass });
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const inputClass = `w-full px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Change Password */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
          <Lock className="w-4 h-4 text-blue-400" />
          Change Password
        </h3>

        <div className="space-y-4 max-w-md">
          {/* Current Password */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPass ? 'text' : 'password'}
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter current password"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showNewPass ? 'text' : 'password'}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new password"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {newPass && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-500">Strength</span>
                  <span className={`text-[10px] font-semibold ${strength.score >= 4 ? 'text-emerald-400' : strength.score >= 3 ? 'text-amber-400' : 'text-red-400'}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(strength.score / 5) * 100}%` }}
                    className={`h-full rounded-full ${strength.color}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm new password"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {passError && <p className="text-xs text-red-400">{passError}</p>}

          <button
            onClick={handlePasswordSubmit}
            className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-sm font-semibold text-blue-400 hover:bg-blue-500/30 transition-all"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-blue-400" />
          Two-Factor Authentication
        </h3>
        <ToggleSwitch
          enabled={twoFactor}
          onChange={setTwoFactor}
          label="Enable Two-Factor Authentication"
          description="Add an extra layer of security to your account"
        />
      </div>

      {/* Active Sessions */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-400" />
            Active Sessions
          </h3>
          <button
            onClick={onLogoutAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout All
          </button>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => {
            const Icon = deviceIcons[session.device.split(' ')[0]] || Laptop;
            return (
              <div
                key={session.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  session.isCurrent
                    ? 'bg-blue-500/5 border-blue-500/20'
                    : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  session.isCurrent ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{session.device}</span>
                    {session.isCurrent && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500/10 text-emerald-400">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{session.browser} — {session.location}</p>
                </div>
                <span className="text-[11px] text-slate-500">
                  {new Date(session.lastActive).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SecuritySettings;
