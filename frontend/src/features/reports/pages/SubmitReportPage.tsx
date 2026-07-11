import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Save,
  RotateCcw,
  Send,
  User,
  FileText,
  Clock,
  MapPin,
  Shield,
  EyeOff,
} from 'lucide-react';
import { ToastContainer, type ToastItem } from '@/shared/components/ui/Toast';
import { FileUpload, type FileItem } from '../components/FileUpload';
import { LocationPicker } from '../components/LocationPicker';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { SidebarInfo } from '../components/SidebarInfo';

const crimeTypes = [
  'Theft', 'Robbery', 'Assault', 'Accident', 'Cyber Crime',
  'Vandalism', 'Missing Person', 'Domestic Violence', 'Other',
];

const severityLevels = [
  { value: 'low', label: 'Low', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', ring: 'peer-checked:border-emerald-500 peer-checked:bg-emerald-500/20' },
  { value: 'medium', label: 'Medium', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', ring: 'peer-checked:border-amber-500 peer-checked:bg-amber-500/20' },
  { value: 'high', label: 'High', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', ring: 'peer-checked:border-orange-500 peer-checked:bg-orange-500/20' },
  { value: 'critical', label: 'Critical', color: 'text-red-400 bg-red-500/10 border-red-500/20', ring: 'peer-checked:border-red-500 peer-checked:bg-red-500/20' },
];

interface ReportForm {
  crimeType: string;
  title: string;
  description: string;
  date: string;
  time: string;
  happeningNow: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  anonymous: boolean;
  witnessName: string;
  witnessContact: string;
  fullName: string;
  mobile: string;
  email: string;
  declaration: boolean;
}

export const SubmitReportPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.006, address: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: ToastItem['type'], message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReportForm>({
    defaultValues: {
      crimeType: 'Theft',
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      happeningNow: false,
      severity: 'medium',
      anonymous: false,
      witnessName: '',
      witnessContact: '',
      fullName: '',
      mobile: '',
      email: '',
      declaration: false,
    },
  });

  const isAnonymous = watch('anonymous');
  const happeningNow = watch('happeningNow');

  const onSubmit = () => {
    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      setShowModal(false);
      addToast('success', 'Report submitted successfully! You will receive updates soon.');
      setTimeout(() => navigate('/my-reports'), 1500);
    } catch {
      addToast('error', 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    addToast('success', 'Draft saved successfully.');
  };

  const handleReset = () => {
    reset();
    setFiles([]);
    setLocation({ lat: 40.7128, lng: -74.006, address: '' });
    setStep(1);
  };

  const totalSteps = 4;

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmSubmit}
        title="Submit Report"
        message="Are you sure you want to submit this crime report? Once submitted, it will be reviewed by our team within 24 hours."
        loading={loading}
      />

      <div className="flex gap-6">
        {/* Main Form */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Report a Crime</h1>
            <p className="text-slate-400">
              Help keep your community safe by reporting incidents accurately.
            </p>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300">
                If this is an emergency, immediately contact your local emergency services at{' '}
                <span className="font-bold">100</span>.
              </p>
            </div>
          </motion.div>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl px-6 py-4"
          >
            <div className="flex items-center justify-between">
              {['Incident', 'Location', 'Evidence', 'Review'].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step > i + 1
                        ? 'bg-emerald-500 text-white'
                        : step === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-white' : 'text-slate-500'}`}>
                    {label}
                  </span>
                  {i < 3 && <div className={`w-8 lg:w-16 h-0.5 mx-1 ${step > i + 1 ? 'bg-emerald-500' : 'bg-white/10'}`} />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Incident Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-2xl p-6 space-y-5"
              >
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Incident Information
                </h2>

                {/* Crime Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Crime Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('crimeType', { required: 'Crime type is required' })}
                    className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    {crimeTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.crimeType && <p className="text-xs text-red-400 mt-1">{errors.crimeType.message}</p>}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Incident Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Brief summary of the incident"
                    {...register('title', { required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters' } })}
                    className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Detailed Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe what happened in detail..."
                    {...register('description', { required: 'Description is required', minLength: { value: 20, message: 'Please provide at least 20 characters' } })}
                    className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                  {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      {...register('date', { required: 'Date is required' })}
                      disabled={happeningNow}
                      className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Time <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="time"
                      {...register('time', { required: 'Time is required' })}
                      disabled={happeningNow}
                      className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-blue-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-navy-950/50 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
                    {...register('happeningNow')}
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    Happening right now
                  </span>
                </label>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Severity Level <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {severityLevels.map((sev) => (
                      <label
                        key={sev.value}
                        className={`relative flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                          watch('severity') === sev.value
                            ? sev.color
                            : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          value={sev.value}
                          className="sr-only"
                          {...register('severity')}
                        />
                        <span className="text-sm font-semibold capitalize">{sev.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-2xl p-6 space-y-5"
              >
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Location
                </h2>
                <LocationPicker
                  lat={location.lat}
                  lng={location.lng}
                  address={location.address}
                  onChange={setLocation}
                />
              </motion.div>
            )}

            {/* Step 3: Evidence & Witnesses */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Evidence Upload */}
                <div className="glass rounded-2xl p-6 space-y-5">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Evidence Upload
                  </h2>
                  <FileUpload files={files} onChange={setFiles} maxFiles={5} maxSizeMB={10} />
                </div>

                {/* Witness Information */}
                <div className="glass rounded-2xl p-6 space-y-5">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Witness Information
                    <span className="text-xs font-normal text-slate-500">(Optional)</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Witness Name</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        {...register('witnessName')}
                        className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Witness Contact</label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        {...register('witnessContact')}
                        className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div className="glass rounded-2xl p-6 space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-white/20 bg-navy-950/50 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
                      {...register('anonymous')}
                    />
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors" />
                      <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                        Submit this report anonymously
                      </span>
                    </div>
                  </label>
                  <p className="text-xs text-slate-500 ml-8">
                    Your personal information will not be attached to this report.
                  </p>

                  {/* Contact Info (if not anonymous) */}
                  {!isAnonymous && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5"
                    >
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          {...register('fullName', !isAnonymous ? { required: 'Name is required' } : undefined)}
                          className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
                        />
                        {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                          Mobile Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          {...register('mobile', !isAnonymous ? { required: 'Mobile is required' } : undefined)}
                          className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
                        />
                        {errors.mobile && <p className="text-xs text-red-400 mt-1">{errors.mobile.message}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          {...register('email', !isAnonymous ? { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } } : undefined)}
                          className="w-full bg-navy-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
                        />
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-2xl p-6 space-y-5"
              >
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-400" />
                  Review & Submit
                </h2>

                {/* Summary */}
                <div className="space-y-3">
                  {[
                    { label: 'Crime Type', value: watch('crimeType') },
                    { label: 'Title', value: watch('title') },
                    { label: 'Severity', value: watch('severity') },
                    { label: 'Date', value: watch('date') },
                    { label: 'Time', value: watch('time') },
                    { label: 'Location', value: location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` },
                    { label: 'Evidence', value: `${files.length} file(s)` },
                    { label: 'Anonymous', value: isAnonymous ? 'Yes' : 'No' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className="text-sm font-medium text-white capitalize">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Declaration */}
                <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-navy-950/50 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
                    {...register('declaration', { required: 'You must confirm the declaration' })}
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    I confirm that the information provided is true to the best of my knowledge. I understand that filing a false report is a criminal offense.
                  </span>
                </label>
                {errors.declaration && <p className="text-xs text-red-400">{errors.declaration.message}</p>}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-white rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/25 transition-all"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-600/25 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Submit Report
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar (Desktop) */}
        <div className="hidden xl:block w-80 flex-shrink-0">
          <div className="sticky top-6">
            <SidebarInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitReportPage;
