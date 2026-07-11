import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, X, Award } from 'lucide-react';
import type { Officer } from '../hooks/useAdminState';

interface OfficerManagementProps {
  officers: Officer[];
  onAddOfficer: (name: string, badgeId: string, rank: string, contact: string) => void;
}

export const OfficerManagement: React.FC<OfficerManagementProps> = ({
  officers,
  onAddOfficer,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [badgeId, setBadgeId] = useState('');
  const [rank, setRank] = useState('Patrol Officer');
  const [contact, setContact] = useState('');
  const [selectedOfficerForMessage, setSelectedOfficerForMessage] = useState<Officer | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !badgeId || !contact) return;
    onAddOfficer(name, badgeId, rank, contact);
    setName('');
    setBadgeId('');
    setContact('');
    setShowAddForm(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText) return;
    alert(`Message dispatched to ${selectedOfficerForMessage?.name}:\n"${messageText}"`);
    setMessageText('');
    setSelectedOfficerForMessage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Law Enforcement Officers</h3>
          <p className="text-slate-500 text-xs mt-0.5">Manage badge registrations and track active units</p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-xs font-bold text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Officer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {officers.map((off) => (
          <motion.div
            layout
            key={off.id}
            className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl gap-4 hover:border-slate-700/50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Online Indicator Bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${off.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-750'}`} />

            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {off.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{off.name}</h4>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{off.rank}</span>
                  </div>
                </div>
                
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${off.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-500 border border-slate-800'}`}>
                  {off.status}
                </span>
              </div>

              <div className="border-t border-slate-900/60 pt-3 space-y-1.5 text-xs text-slate-350">
                <div className="flex justify-between">
                  <span className="text-slate-500">Badge Number</span>
                  <span className="font-mono text-[10px] font-semibold text-slate-300">{off.badgeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Availability</span>
                  <span className="font-semibold text-slate-200">{off.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Workload</span>
                  <span className="font-semibold text-indigo-400">{off.assignedCases} Active Cases</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-t border-slate-900/60 pt-3.5">
              <button
                onClick={() => alert(`Officer Profile:\n\nName: ${off.name}\nBadge: ${off.badgeId}\nRank: ${off.rank}\nContact: ${off.contact}\nStatus: ${off.status}`)}
                className="flex-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold rounded-lg text-slate-300 hover:text-slate-100 transition-all text-center"
              >
                Profile
              </button>
              
              <button
                onClick={() => setSelectedOfficerForMessage(off)}
                className="p-2 bg-indigo-650/10 hover:bg-indigo-600 border border-indigo-500/20 text-indigo-400 hover:text-white rounded-lg transition-all"
                title="Message Officer"
                disabled={off.status === 'Offline'}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Officer Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-500" />
                  <span>Register Officer Badge</span>
                </h3>
                <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Officer John Connor"
                    className="mt-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Badge ID</label>
                    <input
                      type="text"
                      required
                      value={badgeId}
                      onChange={(e) => setBadgeId(e.target.value)}
                      placeholder="e.g. BADGE-7730"
                      className="mt-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Officer Rank</label>
                    <select
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="mt-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Patrol Officer">Patrol Officer</option>
                      <option value="Sergeant">Sergeant</option>
                      <option value="Lieutenant">Lieutenant</option>
                      <option value="Detective">Detective</option>
                      <option value="Captain">Captain</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Radio Contact Link</label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. +1 (555) 911-3829"
                    className="mt-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-950 font-bold transition-all text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-white font-bold transition-all text-xs"
                  >
                    Register unit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dispatches messaging Modal */}
      <AnimatePresence>
        {selectedOfficerForMessage && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-sm font-bold text-slate-100">
                  Radio Dispatch Link: <span className="text-indigo-400 font-semibold">{selectedOfficerForMessage.name}</span>
                </h3>
                <button onClick={() => setSelectedOfficerForMessage(null)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Radio Transmission Message</label>
                  <textarea
                    required
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Enter dispatch details..."
                    className="mt-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedOfficerForMessage(null)}
                    className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-950 font-bold transition-all text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-white font-bold transition-all text-xs"
                  >
                    Transmit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default OfficerManagement;
