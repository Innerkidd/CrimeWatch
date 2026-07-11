import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Shield, CheckCircle, Calendar, Edit3 } from 'lucide-react';
import { type UserProfile } from '../data/mockData';

interface ProfileOverviewProps {
  user: UserProfile;
  onEditProfile: () => void;
}

export const ProfileOverview = ({ user, onEditProfile }: ProfileOverviewProps) => {
  const [avatarHover, setAvatarHover] = useState(false);

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div
          className="relative group"
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white border-4 border-white/10">
            {user.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="w-full h-full rounded-2xl object-cover" />
            ) : (
              initials
            )}
          </div>
          {avatarHover && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center"
            >
              <Camera className="w-5 h-5 text-white" />
            </motion.button>
          )}
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-white">{user.firstName} {user.lastName}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase">
                {user.role}
              </span>
              {user.isVerified ? (
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Verified
                </span>
              ) : (
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  Pending Verification
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-400 mb-1">{user.email}</p>
          <p className="text-sm text-slate-400 mb-3">{user.phone}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              ID: {user.id}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Member since {new Date(user.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEditProfile}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm font-semibold text-blue-400 hover:bg-blue-500/20 transition-all self-start"
        >
          <Edit3 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileOverview;
