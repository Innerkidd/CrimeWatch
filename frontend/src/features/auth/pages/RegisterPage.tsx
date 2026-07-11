import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, User, Phone, ArrowRight, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { PasswordInput } from '@/shared/components/ui/PasswordInput';
import { Button } from '@/shared/components/ui/Button';
import { ToastContainer, type ToastItem } from '@/shared/components/ui/Toast';

interface RegisterForm {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  role: 'citizen' | 'police';
  agreeTerms: boolean;
}

const passwordRules = [
  { label: 'MIN_8_CHARS', test: (p: string) => p.length >= 8 },
  { label: 'UPPERCASE_CHAR', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'LOWERCASE_CHAR', test: (p: string) => /[a-z]/.test(p) },
  { label: 'NUMERIC_CHAR', test: (p: string) => /[0-9]/.test(p) },
  { label: 'SYMBOL_CHAR', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      role: 'citizen',
      agreeTerms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    if (!data.agreeTerms) {
      addToast('error', 'GRID_FAILURE: TERMS AND CONDITIONS MUST BE SIGNED');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem(
        'user',
        JSON.stringify({ email: data.email, name: data.fullName, role: data.role })
      );

      addToast('success', 'NODE REGISTERED. INITIALIZING DATA LINK...');

      setTimeout(() => navigate('/dashboard'), 1000);
    } catch {
      addToast('error', 'REGISTRATION FAILURE. DATA REJECTED.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="hud-panel p-8 sm:p-10 hover:border-cyber-cyan/35 hover:shadow-[0_0_15px_rgba(0,212,255,0.08)] transition-all duration-300 relative">
        {/* HUD Corner Brackets */}
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 mb-4 glow-border-cyan animate-pulse"
          >
            <Shield className="w-7 h-7 text-cyber-cyan glow-cyan" />
          </motion.div>
          <h2 className="text-2xl font-black tracking-widest text-white uppercase font-orbitron mb-1">
            REGISTER_NODE
          </h2>
          <p className="text-xs text-slate-450 font-tech uppercase tracking-wide">
            // SECTOR REGISTRATION PROTOCOL
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
          <Input
            label="SENTINEL NAME"
            type="text"
            placeholder="John Doe"
            icon={User}
            error={errors.fullName?.message}
            {...register('fullName', {
              required: 'Sentinel name is required',
              minLength: { value: 2, message: 'Name must exceed 1 index' },
            })}
          />

          <Input
            label="COORDINATE EMAIL"
            type="email"
            placeholder="node@example.com"
            icon={Mail}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email coordinates required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email syntax',
              },
            })}
          />

          <Input
            label="TEL COMM LINK"
            type="tel"
            placeholder="+1 (555) 000-0000"
            icon={Phone}
            error={errors.mobile?.message}
            {...register('mobile', {
              required: 'Mobile connection index required',
              pattern: {
                value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
                message: 'Invalid mobile connection structure',
              },
            })}
          />

          {/* Role Selector */}
          <div className="space-y-1.5 font-tech">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
              NODE CLASSIFICATION <span className="text-cyber-pink ml-0.5">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'citizen' as const, label: 'Citizen Unit', desc: 'SIGNAL REPORT & TRACK' },
                { value: 'police' as const, label: 'Law Enforcer', desc: 'NODE DISPATCH & INVESTIGATE' },
              ].map((role) => {
                const isSelected = watch('role') === role.value;
                const cyberColor = role.value === 'citizen' ? 'cyber-cyan' : 'cyber-pink';
                return (
                  <label
                    key={role.value}
                    className={`relative flex flex-col items-center p-4 rounded-none border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? role.value === 'citizen'
                          ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan glow-cyan'
                          : 'border-cyber-pink bg-cyber-pink/10 text-cyber-pink glow-pink'
                        : 'border-white/10 bg-cyber-void/45 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      value={role.value}
                      className="sr-only"
                      {...register('role')}
                    />
                    <span className="text-xs font-bold uppercase font-orbitron">{role.label}</span>
                    <span className="text-[9px] text-slate-500 mt-1 uppercase text-center">{role.desc}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="roleIndicator"
                        className={`absolute top-2 right-2 w-4 h-4 rounded-none flex items-center justify-center`}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <CheckCircle className={`w-3.5 h-3.5 ${role.value === 'citizen' ? 'text-cyber-cyan glow-cyan' : 'text-cyber-pink glow-pink'}`} />
                      </motion.div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          <PasswordInput
            label="ENCRYPTION KEY"
            placeholder="CREATE SECURE KEY..."
            error={errors.password?.message}
            {...register('password', {
              required: 'Encryption key required',
              minLength: { value: 8, message: 'Key must exceed 7 indices' },
            })}
          />

          {/* Password Strength Indicator */}
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 font-tech"
            >
              <div className="flex gap-1">
                {passwordRules.map((rule) => (
                  <div
                    key={rule.label}
                    className={`h-1 flex-1 transition-colors duration-300 ${
                      rule.test(password) ? 'bg-cyber-green glow-green' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {passwordRules.map((rule) => {
                  const passed = rule.test(password);
                  return (
                    <div key={rule.label} className="flex items-center gap-1.5">
                      {passed ? (
                        <CheckCircle className="w-3.5 h-3.5 text-cyber-green glow-green" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-slate-700" />
                      )}
                      <span
                        className={`text-[9px] uppercase tracking-wider ${
                          passed ? 'text-cyber-green glow-green' : 'text-slate-500'
                        }`}
                      >
                        {rule.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <PasswordInput
            label="VERIFY ENCRYPTION KEY"
            placeholder="RE-ENTER SECURE KEY..."
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm security key',
              validate: (value) => value === password || 'Keys do not match database',
            })}
          />

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer group font-tech text-[10px] tracking-wider uppercase">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded-none border-cyber-cyan/30 bg-cyber-void/50 text-cyber-cyan focus:ring-cyber-cyan/20 focus:ring-offset-0 cursor-pointer"
              {...register('agreeTerms', { required: true })}
            />
            <span className="text-slate-400 group-hover:text-cyber-cyan transition-colors">
              I AGREE TO THE{' '}
              <a href="#" className="text-cyber-pink hover:text-white underline">
                TERMS_AND_CONDITIONS
              </a>{' '}
              AND{' '}
              <a href="#" className="text-cyber-pink hover:text-white underline">
                PRIVACY_POLICY
              </a>
            </span>
          </label>

          {/* Submit */}
          <Button type="submit" fullWidth loading={loading} size="lg">
            GENERATE_NEW_NODE
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-8 text-center text-xs font-tech uppercase tracking-wide text-slate-455 relative z-10">
          NODE ALREADY REGISTERED?{' '}
          <Link
            to="/login"
            className="font-bold text-cyber-cyan hover:text-cyber-green transition-colors"
          >
            SIGN_IN_MAINFRAME
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
