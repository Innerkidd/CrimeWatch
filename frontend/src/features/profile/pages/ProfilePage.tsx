import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import { ProfileOverview } from '../components/ProfileOverview';
import { PersonalInfoForm } from '../components/PersonalInfoForm';
import { AddressInformation } from '../components/AddressInformation';
import { ChangePassword } from '../components/ChangePassword';
import { TwoFactorAuth } from '../components/TwoFactorAuth';
import { NotificationPreferences } from '../components/NotificationPreferences';
import { PrivacySettings } from '../components/PrivacySettings';
import { EmergencyContacts } from '../components/EmergencyContacts';
import { SaveBar } from '../components/SaveBar';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { ToastContainer, type ToastItem } from '@/shared/components/ui/Toast';
import {
  mockUserProfile,
  mockNotificationPrefs,
  mockPrivacyPrefs,
  mockEmergencyContacts,
  type UserProfile,
  type NotificationPrefs,
  type PrivacyPrefs,
  type EmergencyContact,
} from '../data/mockData';

export const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>(mockUserProfile);
  const [notifPrefs, setNotifPrefs] = useState<NotificationPrefs>(mockNotificationPrefs);
  const [privacyPrefs, setPrivacyPrefs] = useState<PrivacyPrefs>(mockPrivacyPrefs);
  const [contacts, setContacts] = useState<EmergencyContact[]>(mockEmergencyContacts);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const addToast = useCallback((type: ToastItem['type'], message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const markChanged = () => {
    if (!hasChanges) setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setIsSaving(false);
    setHasChanges(false);
    addToast('success', 'Settings saved successfully.');
  };

  const handleCancel = () => {
    setUser(mockUserProfile);
    setNotifPrefs(mockNotificationPrefs);
    setPrivacyPrefs(mockPrivacyPrefs);
    setContacts(mockEmergencyContacts);
    setHasChanges(false);
  };

  const handleReset = () => {
    handleCancel();
    addToast('warning', 'Settings reset to defaults.');
  };

  const handleDeleteAccount = () => {
    setDeleteAccountModal(false);
    addToast('success', 'Account deletion request submitted.');
  };

  const handleDownloadData = () => {
    addToast('success', 'Your data export is being prepared.');
  };

  const handlePasswordChange = (data: { current: string; newPass: string }) => {
    void data;
    addToast('success', 'Password updated successfully.');
  };

  return (
    <div className="space-y-6 pb-24">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ConfirmationModal
        isOpen={deleteAccountModal}
        title="Delete Account"
        message="This action is irreversible. All your data, reports, and account information will be permanently deleted."
        confirmLabel="Delete Account"
        onConfirm={handleDeleteAccount}
        onCancel={() => setDeleteAccountModal(false)}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3 font-orbitron tracking-wider">
            <Settings className="w-7 h-7 text-cyber-cyan glow-cyan animate-pulse" />
            NODE_METADATA_CONFIGS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            // Manage account encryption credentials, UI preference parameters, and safety links.
          </p>
        </div>
      </motion.div>

      {/* Profile Overview */}
      <ProfileOverview user={user} onEditProfile={() => document.getElementById('personal-info')?.scrollIntoView({ behavior: 'smooth' })} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-6" id="personal-info">
          <PersonalInfoForm
            user={user}
            onSave={(data) => {
              setUser((prev) => ({ ...prev, ...data }));
              markChanged();
              addToast('success', 'Personal information updated.');
            }}
          />
          <AddressInformation
            user={user}
            onSave={(data) => {
              setUser((prev) => ({ ...prev, ...data }));
              markChanged();
              addToast('success', 'Address information updated.');
            }}
          />
          <EmergencyContacts contacts={contacts} onChange={(c) => { setContacts(c); markChanged(); }} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ChangePassword onPasswordChange={handlePasswordChange} />
          <TwoFactorAuth />
          <NotificationPreferences prefs={notifPrefs} onChange={(p) => { setNotifPrefs(p); markChanged(); }} />
          <PrivacySettings
            prefs={privacyPrefs}
            onChange={(p) => { setPrivacyPrefs(p); markChanged(); }}
            onDeleteAccount={() => setDeleteAccountModal(true)}
            onDownloadData={handleDownloadData}
          />
        </div>
      </div>

      {/* Floating Save Bar */}
      <AnimatePresence>
        {hasChanges && (
          <SaveBar
            hasChanges={hasChanges}
            isSaving={isSaving}
            onSave={handleSave}
            onCancel={handleCancel}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
