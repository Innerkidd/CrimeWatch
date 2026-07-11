import { motion } from 'framer-motion';
import { Phone, Shield, Ambulance, Flame, UserCheck, Monitor } from 'lucide-react';

const contacts = [
  { icon: Shield, label: 'Police', number: '100', color: 'from-blue-500 to-blue-600' },
  { icon: Ambulance, label: 'Ambulance', number: '108', color: 'from-emerald-500 to-green-500' },
  { icon: Flame, label: 'Fire', number: '101', color: 'from-orange-500 to-red-500' },
  { icon: UserCheck, label: 'Women Helpline', number: '1091', color: 'from-pink-500 to-rose-500' },
  { icon: Monitor, label: 'Cyber Crime', number: '1930', color: 'from-violet-500 to-purple-500' },
];

export const EmergencyContacts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass rounded-2xl p-6"
    >
      <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
        <Phone className="w-5 h-5 text-red-400" />
        Emergency Contacts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {contacts.map((contact, i) => (
          <motion.a
            key={contact.label}
            href={`tel:${contact.number}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <contact.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{contact.label}</p>
              <p className="text-lg font-bold text-white font-mono">{contact.number}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default EmergencyContacts;
