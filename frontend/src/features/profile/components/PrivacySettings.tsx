import { motion } from 'framer-motion';
import { Eye, Download, Trash2 } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';
import { type PrivacyPrefs } from '../data/mockData';

interface PrivacySettingsProps {
  prefs: PrivacyPrefs;
  onChange: (prefs: PrivacyPrefs) => void;
  onDeleteAccount: () => void;
  onDownloadData: () => void;
}

export const PrivacySettings = ({ prefs, onChange, onDeleteAccount, onDownloadData }: PrivacySettingsProps) => {
  const update = (key: keyof PrivacyPrefs, value: boolean) => {
    onChange({ ...prefs, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
        <Eye className="w-4 h-4 text-blue-400" />
        Privacy Settings
      </h3>

      <div className="space-y-1">
        <ToggleSwitch
          enabled={prefs.anonymousReporting}
          onChange={(v) => update('anonymousReporting', v)}
          label="Anonymous Reporting"
          description="Hide your identity when submitting crime reports"
        />
        <ToggleSwitch
          enabled={prefs.profileVisibleToPolice}
          onChange={(v) => update('profileVisibleToPolice', v)}
          label="Profile Visible to Police"
          description="Allow assigned officers to view your profile information"
        />
        <ToggleSwitch
          enabled={prefs.shareLiveLocation}
          onChange={(v) => update('shareLiveLocation', v)}
          label="Share Live Location During Emergency"
          description="Automatically share your location when you trigger an emergency alert"
        />
        <ToggleSwitch
          enabled={prefs.dataSharing}
          onChange={(v) => update('dataSharing', v)}
          label="Data Sharing for Research"
          description="Anonymously share data to improve public safety research"
        />
      </div>

      <div className="border-t border-white/5 mt-5 pt-5 space-y-3">
        <button
          onClick={onDownloadData}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all"
        >
          <Download className="w-4 h-4 text-blue-400" />
          Download Personal Data
        </button>
        <button
          onClick={onDeleteAccount}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>
    </motion.div>
  );
};

export default PrivacySettings;
