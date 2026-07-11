import React from 'react';

export const ManageCrimesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Manage Crimes</h1>
        <p className="text-slate-400 text-sm">Moderate, verify, or remove safety reports submitted by users.</p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center text-slate-500">
        Crime moderation list is currently empty. All submitted reports are verified.
      </div>
    </div>
  );
};

export default ManageCrimesPage;
