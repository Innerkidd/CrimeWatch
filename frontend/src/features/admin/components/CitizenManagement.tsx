import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Mail, Phone, MapPin, Shield, X, Eye, Ban, CheckCircle } from 'lucide-react';

interface Citizen {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registeredDate: string;
  reportsFiled: number;
  status: 'active' | 'suspended' | 'pending';
  verified: boolean;
}

const initialCitizens: Citizen[] = [
  { id: 'CIT-001', name: 'Marcus Aurelius', email: 'marcus@email.com', phone: '+1 (555) 111-2233', address: '42 Wallaby Way', registeredDate: '2026-01-15', reportsFiled: 5, status: 'active', verified: true },
  { id: 'CIT-002', name: 'Jane Doe', email: 'jane@email.com', phone: '+1 (555) 222-3344', address: 'Subway Station Area', registeredDate: '2026-02-20', reportsFiled: 3, status: 'active', verified: true },
  { id: 'CIT-003', name: 'Franklin Pierce', email: 'frank@email.com', phone: '+1 (555) 333-4455', address: 'Pine Ridge Apartments', registeredDate: '2026-03-10', reportsFiled: 8, status: 'active', verified: true },
  { id: 'CIT-004', name: 'Clara Oswald', email: 'clara@email.com', phone: '+1 (555) 444-5566', address: 'High Street', registeredDate: '2026-04-05', reportsFiled: 2, status: 'suspended', verified: false },
  { id: 'CIT-005', name: 'Rory Williams', email: 'rory@email.com', phone: '+1 (555) 555-6677', address: 'Central Park East', registeredDate: '2026-05-12', reportsFiled: 0, status: 'pending', verified: false },
];

export const CitizenManagement: React.FC = () => {
  const [citizens, setCitizens] = useState<Citizen[]>(initialCitizens);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);

  const filteredCitizens = citizens.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const toggleVerify = (id: string) => {
    setCitizens((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
    );
  };

  const toggleSuspend = (id: string) => {
    setCitizens((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'suspended' ? 'active' : 'suspended' }
          : c
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default:
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Citizen Management</h3>
          <p className="text-slate-500 text-xs mt-0.5">Manage registered citizen accounts and reports</p>
        </div>
      </div>

      <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search citizens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/30 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="px-4 py-3">Citizen</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Reports Filed</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300 text-sm">
              {filteredCitizens.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No citizens match the current filters.
                  </td>
                </tr>
              ) : (
                filteredCitizens.map((citizen) => (
                  <tr key={citizen.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 font-bold text-[10px]">
                          {citizen.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-200">{citizen.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{citizen.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <p className="text-[11px] text-slate-400 flex items-center gap-1"><Mail className="w-3 h-3" />{citizen.email}</p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" />{citizen.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-indigo-400">{citizen.reportsFiled}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusBadge(citizen.status)}`}>
                        {citizen.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {citizen.verified ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Ban className="w-4 h-4 text-slate-600" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCitizen(citizen)}
                          className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:border-indigo-500/30 hover:bg-indigo-950/20 text-slate-400 hover:text-indigo-400 transition-all"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleVerify(citizen.id)}
                          className={`p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-emerald-950/20 transition-all ${
                            citizen.verified ? 'text-emerald-400 hover:border-emerald-500/30' : 'text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30'
                          }`}
                          title={citizen.verified ? 'Unverify' : 'Verify'}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleSuspend(citizen.id)}
                          className={`p-1.5 bg-slate-900 border border-slate-800 rounded transition-all ${
                            citizen.status === 'suspended'
                              ? 'text-red-400 hover:bg-red-950/20 hover:border-red-500/30'
                              : 'text-slate-400 hover:text-red-400 hover:bg-red-950/20 hover:border-red-500/30'
                          }`}
                          title={citizen.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Citizen Detail Modal */}
      <AnimatePresence>
        {selectedCitizen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  Citizen Profile
                </h3>
                <button onClick={() => setSelectedCitizen(null)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {selectedCitizen.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{selectedCitizen.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{selectedCitizen.id}</p>
                  </div>
                </div>

                <div className="space-y-2 bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1"><Mail className="w-3 h-3" />Email</span>
                    <span className="text-slate-300">{selectedCitizen.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" />Phone</span>
                    <span className="text-slate-300">{selectedCitizen.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" />Address</span>
                    <span className="text-slate-300">{selectedCitizen.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1"><Shield className="w-3 h-3" />Reports Filed</span>
                    <span className="text-indigo-400 font-bold">{selectedCitizen.reportsFiled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registered</span>
                    <span className="text-slate-300">{selectedCitizen.registeredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusBadge(selectedCitizen.status)}`}>
                      {selectedCitizen.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-800">
                <button
                  onClick={() => setSelectedCitizen(null)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CitizenManagement;
