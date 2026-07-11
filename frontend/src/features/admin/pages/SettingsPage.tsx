import React from 'react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Global Settings</h1>
        <p className="text-slate-400 text-sm">Configure system preferences and notification settings.</p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center text-slate-500">
        System configurations are set to default.
      </div>
    </div>
  );
};

export default SettingsPage;
