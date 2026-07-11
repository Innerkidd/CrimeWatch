import React from 'react';

export const UsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">User Management</h1>
        <p className="text-slate-400 text-sm">View and manage registered users and their permissions.</p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center text-slate-500">
        No other users registered.
      </div>
    </div>
  );
};

export default UsersPage;
