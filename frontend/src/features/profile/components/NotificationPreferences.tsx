import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';
import { type NotificationPrefs } from '../data/mockData';

interface NotificationPreferencesProps {
  prefs: NotificationPrefs;
  onChange: (prefs: NotificationPrefs) => void;
}

export const NotificationPreferences = ({ prefs, onChange }: NotificationPreferencesProps) => {
  const update = (key: keyof NotificationPrefs, value: boolean) => {
    onChange({ ...prefs, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
        <Bell className="w-4 h-4 text-blue-400" />
        Notification Preferences
      </h3>

      <div className="space-y-1">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Alert Types</p>

        <ToggleSwitch
          enabled={prefs.crimeAlerts}
          onChange={(v) => update('crimeAlerts', v)}
          label="Crime Alerts"
          description="Receive alerts about crimes reported near your location"
        />
        <ToggleSwitch
          enabled={prefs.investigationUpdates}
          onChange={(v) => update('investigationUpdates', v)}
          label="Investigation Updates"
          description="Get notified when your submitted reports are updated"
        />
        <ToggleSwitch
          enabled={prefs.emergencyAlerts}
          onChange={(v) => update('emergencyAlerts', v)}
          label="Emergency Alerts"
          description="Critical alerts for emergencies in your area"
        />
        <ToggleSwitch
          enabled={prefs.communityAnnouncements}
          onChange={(v) => update('communityAnnouncements', v)}
          label="Community Announcements"
          description="Safety campaigns, events, and community updates"
        />

        <div className="pt-4 pb-2">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Delivery Channels</p>
        </div>

        <ToggleSwitch
          enabled={prefs.pushNotifications}
          onChange={(v) => update('pushNotifications', v)}
          label="Push Notifications"
          description="In-app push notifications"
        />
        <ToggleSwitch
          enabled={prefs.emailNotifications}
          onChange={(v) => update('emailNotifications', v)}
          label="Email Notifications"
          description="Receive alerts via email"
        />
        <ToggleSwitch
          enabled={prefs.smsNotifications}
          onChange={(v) => update('smsNotifications', v)}
          label="SMS Notifications"
          description="Receive text message alerts for critical updates"
        />
      </div>
    </motion.div>
  );
};

export default NotificationPreferences;
