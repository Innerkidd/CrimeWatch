import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, Save } from 'lucide-react';
import { type UserProfile } from '../data/mockData';

interface AddressInformationProps {
  user: UserProfile;
  onSave: (data: Partial<UserProfile>) => void;
}

interface FormData {
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export const AddressInformation = ({ user, onSave }: AddressInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      address: user.address,
      city: user.city,
      state: user.state,
      postalCode: user.postalCode,
    },
  });

  const onSubmit = (data: FormData) => {
    onSave(data);
    setIsEditing(false);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
      hasError
        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
        : 'border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20'
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-400" />
          Address Information
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Street Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              {...register('address')}
              disabled={!isEditing}
              className={`${inputClass(false)} pl-9 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">City</label>
            <input
              {...register('city')}
              disabled={!isEditing}
              className={`${inputClass(false)} ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">State</label>
            <input
              {...register('state')}
              disabled={!isEditing}
              className={`${inputClass(false)} ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Postal Code</label>
            <input
              {...register('postalCode')}
              disabled={!isEditing}
              className={`${inputClass(false)} ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-sm font-semibold text-blue-400 hover:bg-blue-500/30 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => { reset(); setIsEditing(false); }}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              Cancel
            </button>
            {isDirty && (
              <span className="text-[11px] text-amber-400">Unsaved changes</span>
            )}
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default AddressInformation;
