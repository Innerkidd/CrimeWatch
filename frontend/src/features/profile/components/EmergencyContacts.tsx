import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Edit3, Trash2, X, User } from 'lucide-react';
import { type EmergencyContact } from '../data/mockData';
import { ConfirmationModal } from './ConfirmationModal';

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  onChange: (contacts: EmergencyContact[]) => void;
}

export const EmergencyContacts = ({ contacts, onChange }: EmergencyContactsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({ name: '', relationship: '', phone: '' });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string }>({ open: false, id: '' });

  const handleAdd = () => {
    if (!newContact.name || !newContact.phone) return;
    const contact: EmergencyContact = {
      id: `ec-${Date.now()}`,
      ...newContact,
    };
    onChange([...contacts, contact]);
    setNewContact({ name: '', relationship: '', phone: '' });
    setIsAdding(false);
  };

  const handleEdit = (contact: EmergencyContact) => {
    setEditingId(contact.id);
    setNewContact({ name: contact.name, relationship: contact.relationship, phone: contact.phone });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    onChange(
      contacts.map((c) =>
        c.id === editingId ? { ...c, ...newContact } : c
      )
    );
    setEditingId(null);
    setNewContact({ name: '', relationship: '', phone: '' });
  };

  const handleDelete = () => {
    onChange(contacts.filter((c) => c.id !== deleteModal.id));
    setDeleteModal({ open: false, id: '' });
  };

  const inputClass = `w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all`;

  return (
    <>
      <ConfirmationModal
        isOpen={deleteModal.open}
        title="Delete Contact"
        message="Are you sure you want to remove this emergency contact?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: '' })}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            Emergency Contacts ({contacts.length})
          </h3>
          {!isAdding && !editingId && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          )}
        </div>

        <div className="space-y-3">
          {/* Add form */}
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-blue-400">New Contact</span>
                    <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    placeholder="Name *"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Relationship"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Phone *"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className={inputClass}
                  />
                  <button
                    onClick={handleAdd}
                    className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-sm font-semibold text-blue-400 hover:bg-blue-500/30 transition-all"
                  >
                    Save Contact
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit form */}
          <AnimatePresence>
            {editingId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-amber-400">Edit Contact</span>
                    <button onClick={() => { setEditingId(null); setNewContact({ name: '', relationship: '', phone: '' }); }} className="text-slate-500 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    placeholder="Name *"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Relationship"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    placeholder="Phone *"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className={inputClass}
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-sm font-semibold text-amber-400 hover:bg-amber-500/30 transition-all"
                  >
                    Update Contact
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contacts list */}
          {contacts.length === 0 && !isAdding && (
            <p className="text-sm text-slate-500 text-center py-4">No emergency contacts added yet.</p>
          )}

          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{contact.name}</p>
                <p className="text-xs text-slate-500">{contact.relationship || 'Contact'}</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">{contact.phone}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(contact)}
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteModal({ open: true, id: contact.id })}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default EmergencyContacts;
