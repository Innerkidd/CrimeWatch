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
            className="space-y-3 text-left font-tech"
          >
            <h1 className="text-2xl lg:text-3xl font-black text-white font-orbitron uppercase tracking-wider">INIT_CRIME_LOG_TRANSMISSION</h1>
            <p className="text-xs text-slate-400">
              // INPUT INCIDENT PARAMETERS TO BROADCAST SIGNAL TO DISPATCH NETWORK.
            </p>
            <div className="flex items-center gap-3 px-4 py-3 rounded-none bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink glow-pink">
              <AlertTriangle className="w-5 h-5 text-cyber-pink flex-shrink-0 animate-pulse" />
              <p className="text-xs leading-normal">
                CRITICAL WARNING: IF ACTIVE THREAT IS ONGOING, TERMINATE WEB TRANSMISSION AND DIAL EMERGENCY SERVICES AT <span className="font-bold">100</span>.
              </p>
            </div>
          </motion.div>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hud-panel px-6 py-4 relative border border-cyber-cyan/15 bg-cyber-void/80"
          >
            {/* HUD Brackets Corners */}
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />

            <div className="flex items-center justify-between font-tech text-xs uppercase tracking-wider relative z-10">
              {['Incident', 'Location', 'Evidence', 'Review'].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-none flex items-center justify-center text-sm font-bold border transition-all ${
                      step > i + 1
                        ? 'bg-cyber-green text-cyber-void border-cyber-green glow-green'
                        : step === i + 1
                        ? 'bg-cyber-cyan text-cyber-void border-cyber-cyan glow-cyan'
                        : 'bg-cyber-void border-cyber-cyan/20 text-slate-500'
                    }`}
                  >
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-bold hidden sm:block ${step === i + 1 ? 'text-cyber-cyan glow-cyan' : 'text-slate-500'}`}>
                    {label}
                  </span>
                  {i < 3 && <div className={`w-8 lg:w-16 h-0.5 mx-1 ${step > i + 1 ? 'bg-cyber-green' : 'bg-cyber-cyan/15'}`} />}
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
                className="hud-panel p-6 space-y-5 border border-cyber-cyan/15 bg-cyber-void/80 relative"
              >
                {/* HUD Brackets Corners */}
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />

                <h2 className="text-sm font-bold font-orbitron text-white flex items-center gap-2 uppercase tracking-wider border-b border-cyber-cyan/15 pb-2 mb-2 relative z-10">
                  <FileText className="w-5 h-5 text-cyber-cyan glow-cyan" />
                  INCIDENT_INFORMATION_SCHEMA
                </h2>

                {/* Crime Type */}
                <div className="relative z-10 font-tech">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    CRIME CLASSIFICATION <span className="text-cyber-pink">*</span>
                  </label>
                  <select
                    {...register('crimeType', { required: 'Crime type is required' })}
                    className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/10 transition-all font-tech uppercase"
                  >
                    {crimeTypes.map((type) => (
                      <option key={type} value={type} className="bg-cyber-void text-cyber-cyan">{type}</option>
                    ))}
                  </select>
                  {errors.crimeType && <p className="text-xs text-cyber-pink mt-1">{errors.crimeType.message}</p>}
                </div>

                {/* Title */}
                <div className="relative z-10 font-tech">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    INCIDENT TITLE <span className="text-cyber-pink">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Brief summary of the incident"
                    {...register('title', { required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters' } })}
                    className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/10 transition-all font-tech"
                  />
                  {errors.title && <p className="text-xs text-cyber-pink mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div className="relative z-10 font-tech">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    DETAILED DESCRIPTION <span className="text-cyber-pink">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe what happened in detail..."
                    {...register('description', { required: 'Description is required', minLength: { value: 20, message: 'Please provide at least 20 characters' } })}
                    className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/10 transition-all resize-none font-tech"
                  />
                  {errors.description && <p className="text-xs text-cyber-pink mt-1">{errors.description.message}</p>}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 font-tech">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                      <Clock className="w-4 h-4 inline mr-1 text-cyber-cyan" />
                      DATE <span className="text-cyber-pink">*</span>
                    </label>
                    <input
                      type="date"
                      {...register('date', { required: 'Date is required' })}
                      disabled={happeningNow}
                      className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan outline-none focus:border-cyber-cyan/50 transition-all disabled:opacity-50 font-tech uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                      TIME <span className="text-cyber-pink">*</span>
                    </label>
                    <input
                      type="time"
                      {...register('time', { required: 'Time is required' })}
                      disabled={happeningNow}
                      className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan outline-none focus:border-cyber-cyan/50 transition-all disabled:opacity-50 font-tech"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer group relative z-10 font-tech">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-none border border-cyber-cyan/35 bg-cyber-void text-cyber-cyan focus:ring-cyber-cyan/20 cursor-pointer"
                    {...register('happeningNow')}
                  />
                  <span className="text-xs font-bold text-slate-400 group-hover:text-cyber-cyan transition-colors uppercase tracking-wider">
                    // ACT_SIGNAL: HAPPENING_RIGHT_NOW (REALTIME_ROUTE)
                  </span>
                </label>

                {/* Severity */}
                <div className="relative z-10 font-tech">
                  <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wide">
                    <Shield className="w-4 h-4 inline mr-1 text-cyber-cyan" />
                    SEVERITY CLASSIFICATION <span className="text-cyber-pink">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {severityLevels.map((sev) => {
                      const isSelected = watch('severity') === sev.value;
                      const activeStyle =
                        sev.value === 'low'
                          ? 'text-cyber-green bg-cyber-green/10 border-cyber-green glow-green'
                          : sev.value === 'medium'
                          ? 'text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow glow-yellow'
                          : 'text-cyber-pink bg-cyber-pink/10 border-cyber-pink glow-pink';

                      return (
                        <label
                          key={sev.value}
                          className={`relative flex items-center justify-center p-3 rounded-none border cursor-pointer transition-all ${
                            isSelected
                              ? activeStyle
                              : 'border-cyber-cyan/20 bg-cyber-void/80 text-slate-400 hover:border-cyber-cyan/45 hover:text-white'
                          }`}
                        >
                          <input
                            type="radio"
                            value={sev.value}
                            className="sr-only"
                            {...register('severity')}
                          />
                          <span className="text-xs font-bold capitalize tracking-wider font-tech uppercase">{sev.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hud-panel p-6 space-y-5 border border-cyber-cyan/15 bg-cyber-void/80 relative"
              >
                {/* HUD Brackets Corners */}
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />

                <h2 className="text-sm font-bold font-orbitron text-white flex items-center gap-2 uppercase tracking-wider border-b border-cyber-cyan/15 pb-2 mb-2 relative z-10">
                  <MapPin className="w-5 h-5 text-cyber-cyan glow-cyan" />
                  LOC_COORD_SELECTOR
                </h2>
                <div className="relative z-10">
                  <LocationPicker
                    lat={location.lat}
                    lng={location.lng}
                    address={location.address}
                    onChange={setLocation}
                  />
                </div>
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
                <div className="hud-panel p-6 space-y-5 border border-cyber-cyan/15 bg-cyber-void/80 relative">
                  {/* HUD Brackets Corners */}
                  <div className="hud-corner-tr" />
                  <div className="hud-corner-bl" />

                  <h2 className="text-sm font-bold font-orbitron text-white flex items-center gap-2 uppercase tracking-wider border-b border-cyber-cyan/15 pb-2 mb-2 relative z-10">
                    <FileText className="w-5 h-5 text-cyber-cyan glow-cyan" />
                    MEDIA_EVIDENCE_UPLOAD
                  </h2>
                  <div className="relative z-10">
                    <FileUpload files={files} onChange={setFiles} maxFiles={5} maxSizeMB={10} />
                  </div>
                </div>

                {/* Witness Information */}
                <div className="hud-panel p-6 space-y-5 border border-cyber-cyan/15 bg-cyber-void/80 relative">
                  {/* HUD Brackets Corners */}
                  <div className="hud-corner-tr" />
                  <div className="hud-corner-bl" />

                  <h2 className="text-sm font-bold font-orbitron text-white flex items-center gap-2 uppercase tracking-wider border-b border-cyber-cyan/15 pb-2 mb-2 relative z-10">
                    <User className="w-5 h-5 text-cyber-cyan glow-cyan" />
                    WITNESS_INFORMATION_LOGS
                    <span className="text-[10px] font-normal text-slate-500 lowercase tracking-normal font-tech">(optional)</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 font-tech">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">WITNESS NAME</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        {...register('witnessName')}
                        className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 transition-all font-tech"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">WITNESS CONTACT</label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        {...register('witnessContact')}
                        className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 transition-all font-tech"
                      />
                    </div>
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div className="hud-panel p-6 space-y-4 border border-cyber-cyan/15 bg-cyber-void/80 relative">
                  {/* HUD Brackets Corners */}
                  <div className="hud-corner-tr" />
                  <div className="hud-corner-bl" />

                  <label className="flex items-center gap-3 cursor-pointer group relative z-10 font-tech">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-none border border-cyber-cyan/35 bg-cyber-void text-cyber-cyan focus:ring-cyber-cyan/20 cursor-pointer"
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
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cyber-cyan/15"
                    >
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                          Full Name <span className="text-cyber-pink">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          {...register('fullName', !isAnonymous ? { required: 'Name is required' } : undefined)}
                          className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 transition-all font-tech"
                        />
                        {errors.fullName && <p className="text-xs text-cyber-pink mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                          Mobile Number <span className="text-cyber-pink">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          {...register('mobile', !isAnonymous ? { required: 'Mobile is required' } : undefined)}
                          className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 transition-all font-tech"
                        />
                        {errors.mobile && <p className="text-xs text-cyber-pink mt-1">{errors.mobile.message}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                          Email Address <span className="text-cyber-pink">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          {...register('email', !isAnonymous ? { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } } : undefined)}
                          className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none px-4 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 transition-all font-tech"
                        />
                        {errors.email && <p className="text-xs text-cyber-pink mt-1">{errors.email.message}</p>}
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
                className="hud-panel p-6 space-y-5 border border-cyber-cyan/15 bg-cyber-void/80 relative"
              >
                {/* HUD Brackets Corners */}
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />

                <h2 className="text-sm font-bold font-orbitron text-white flex items-center gap-2 uppercase tracking-wider border-b border-cyber-cyan/15 pb-2 mb-2 relative z-10">
                  <Send className="w-5 h-5 text-cyber-cyan glow-cyan" />
                  INCIDENT_TRANSMISSION_SUMMARY
                </h2>

                {/* Summary */}
                <div className="space-y-3 relative z-10 font-tech uppercase text-xs">
                  {[
                    { label: 'CRIME CLASSIFICATION', value: watch('crimeType') },
                    { label: 'LOG_TITLE', value: watch('title') },
                    { label: 'THREAT_SEVERITY', value: watch('severity') },
                    { label: 'TRANS_DATE', value: watch('date') },
                    { label: 'TRANS_TIME', value: watch('time') },
                    { label: 'COORDINATES_ADDR', value: location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` },
                    { label: 'ATTACHED_EVIDENCE', value: `${files.length} file(s)` },
                    { label: 'ANONYMOUS_TRANSMISSION', value: isAnonymous ? 'Yes' : 'No' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-cyber-cyan/10 last:border-0">
                      <span className="text-slate-450 font-bold">{item.label}</span>
                      <span className="font-bold text-white max-w-[240px] truncate">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Declaration */}
                <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-none bg-cyber-cyan/5 border border-cyber-cyan/15 relative z-10 font-tech">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded-none border border-cyber-cyan/35 bg-cyber-void text-cyber-cyan focus:ring-cyber-cyan/20 cursor-pointer"
                    {...register('declaration', { required: 'You must confirm the declaration' })}
                  />
                  <span className="text-xs text-slate-450 group-hover:text-cyber-cyan transition-colors leading-relaxed uppercase tracking-wider">
                    I CONFIRM THAT THE DETAILS TRANSMITTED ARE VALID. I UNDERSTAND THAT FALSE DISPATCH SIGNAL BROADCASTING IS A PENAL SECTOR OFFENSE.
                  </span>
                </label>
                {errors.declaration && <p className="text-xs text-cyber-pink relative z-10">{errors.declaration.message}</p>}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 font-tech text-xs uppercase tracking-wider">
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-cyber-cyan bg-cyber-cyan/5 border border-cyber-cyan/25 rounded-none hover:bg-cyber-cyan/15 transition-colors cursor-pointer chamfer-button"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    BACK_COORD
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-cyber-cyan rounded-none transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  SYS_RESET
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-cyber-cyan bg-cyber-cyan/5 border border-cyber-cyan/25 rounded-none hover:bg-cyber-cyan/15 transition-colors cursor-pointer chamfer-button"
                >
                  <Save className="w-4 h-4" />
                  SAVE_DRAFT
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-cyber-void bg-cyber-cyan hover:bg-cyber-green rounded-none shadow-[0_0_10px_rgba(0,212,255,0.25)] transition-all cursor-pointer chamfer-button"
                  >
                    NEXT_STEP
                    <ChevronRight className="w-4 h-4 text-cyber-void" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-cyber-pink hover:bg-white hover:text-cyber-void border border-cyber-pink rounded-none shadow-[0_0_10px_rgba(255,0,119,0.25)] transition-all cursor-pointer chamfer-button"
                  >
                    <Send className="w-4 h-4" />
                    BROADCAST_LOG
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
