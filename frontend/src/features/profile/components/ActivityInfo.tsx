import { motion } from 'framer-motion';
import { Activity, Clock, CheckCircle, XCircle } from 'lucide-react';
import { type UserProfile, type LoginHistory } from '../data/mockData';

interface ActivityInfoProps {
  user: UserProfile;
  loginHistory: LoginHistory[];
}

export const ActivityInfo = ({ user, loginHistory }: ActivityInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-4"
    >
      {/* Account Stats */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-blue-400" />
          Account Information
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-xl font-bold text-white">{user.reportsSubmitted}</p>
            <p className="text-[11px] text-slate-500">Reports Submitted</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-xl font-bold text-white">{user.casesFollowed}</p>
            <p className="text-[11px] text-slate-500">Cases Followed</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-[11px] text-slate-400 mb-0.5">Last Login</p>
            <p className="text-sm font-medium text-white">
              {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-[11px] text-slate-400 mb-0.5">Verification</p>
            <div className="flex items-center gap-1.5">
              {user.isVerified ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">Verified</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Pending</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-blue-400" />
          Login History
        </h3>

        <div className="space-y-2">
          {loginHistory.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors"
            >
              {entry.status === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{entry.device}</p>
                <p className="text-[11px] text-slate-500">{entry.location}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[11px] text-slate-400">{entry.date}</p>
                <p className="text-[10px] text-slate-500">{entry.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityInfo;
