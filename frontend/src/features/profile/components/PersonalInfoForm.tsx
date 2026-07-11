import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Save } from 'lucide-react';
import { type UserProfile } from '../data/mockData';

interface PersonalInfoFormProps {
  user: UserProfile;
  onSave: (data: Partial<UserProfile>) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}

export const PersonalInfoForm = ({ user, onSave }: PersonalInfoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    },
  });

  const onSubmit = (data: FormData) => {
    onSave({ ...data, gender: data.gender as UserProfile['gender'] });
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
      transition={{ delay: 0.1 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          Personal Information
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                {...register('firstName', { required: 'First name is required' })}
                disabled={!isEditing}
                className={`${inputClass(!!errors.firstName)} pl-9 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
            </div>
            {errors.firstName && <p className="text-[11px] text-red-400 mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Last Name *
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              disabled={!isEditing}
              className={`${inputClass(!!errors.lastName)} ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
            {errors.lastName && <p className="text-[11px] text-red-400 mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                })}
                type="email"
                disabled={!isEditing}
                className={`${inputClass(!!errors.email)} pl-9 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Phone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                {...register('phone', {
                  required: 'Phone is required',
                  pattern: { value: /^\+?[\d\s\-()]+$/, message: 'Invalid phone number' },
                })}
                type="tel"
                disabled={!isEditing}
                className={`${inputClass(!!errors.phone)} pl-9 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
            </div>
            {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                {...register('dateOfBirth')}
                type="date"
                disabled={!isEditing}
                className={`${inputClass(false)} pl-9 ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Gender
            </label>
            <select
              {...register('gender')}
              disabled={!isEditing}
              className={`${inputClass(false)} appearance-none ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <option value="male" className="bg-slate-800">Male</option>
              <option value="female" className="bg-slate-800">Female</option>
              <option value="other" className="bg-slate-800">Other</option>
              <option value="prefer_not_to_say" className="bg-slate-800">Prefer not to say</option>
            </select>
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

export default PersonalInfoForm;
