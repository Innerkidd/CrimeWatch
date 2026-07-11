import { motion } from 'framer-motion';
import { Palette, Globe, Type } from 'lucide-react';
import { type AppearancePrefs, type Theme, type FontSize, languages } from '../data/mockData';

interface AppearanceSettingsProps {
  prefs: AppearancePrefs;
  onChange: (prefs: AppearancePrefs) => void;
}

const themes: { key: Theme; label: string; color: string }[] = [
  { key: 'light', label: 'Light', color: 'bg-white border-slate-200' },
  { key: 'dark', label: 'Dark', color: 'bg-slate-800 border-slate-600' },
  { key: 'system', label: 'System', color: 'bg-gradient-to-r from-white to-slate-800 border-slate-400' },
];

const fontSizes: { key: FontSize; label: string; size: string }[] = [
  { key: 'small', label: 'Small', size: 'text-xs' },
  { key: 'medium', label: 'Medium', size: 'text-sm' },
  { key: 'large', label: 'Large', size: 'text-base' },
];

export const AppearanceSettings = ({ prefs, onChange }: AppearanceSettingsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
        <Palette className="w-4 h-4 text-blue-400" />
        Appearance
      </h3>

      {/* Theme */}
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Theme</p>
        <div className="flex gap-3">
          {themes.map((theme) => (
            <button
              key={theme.key}
              onClick={() => onChange({ ...prefs, theme: theme.key })}
              className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                prefs.theme === theme.key
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/5 hover:border-white/15 bg-white/[0.02]'
              }`}
            >
              <div className={`w-full h-8 rounded-lg ${theme.color} border`} />
              <span className="text-xs font-semibold text-slate-300">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Language</p>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <select
            value={prefs.language}
            onChange={(e) => onChange({ ...prefs, language: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-slate-800">
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Font Size */}
      <div>
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Font Size</p>
        <div className="flex gap-3">
          {fontSizes.map((fs) => (
            <button
              key={fs.key}
              onClick={() => onChange({ ...prefs, fontSize: fs.key })}
              className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                prefs.fontSize === fs.key
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/5 hover:border-white/15 bg-white/[0.02]'
              }`}
            >
              <Type className={`w-4 h-4 ${prefs.fontSize === fs.key ? 'text-blue-400' : 'text-slate-500'}`} />
              <span className={`font-semibold ${fs.size} ${prefs.fontSize === fs.key ? 'text-blue-400' : 'text-slate-300'}`}>
                {fs.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AppearanceSettings;
