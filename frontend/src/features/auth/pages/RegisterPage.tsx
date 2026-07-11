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
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Contains lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'Contains a number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'Contains special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
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
      addToast('error', 'Please agree to the Terms & Conditions');
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

      addToast('success', 'Account created successfully! Redirecting...');

      setTimeout(() => navigate('/'), 1000);
    } catch {
      addToast('error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="glass rounded-2xl p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-500/20 mb-4"
          >
            <Shield className="w-7 h-7 text-blue-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-1">Create account</h2>
          <p className="text-sm text-slate-400">
            Join CrimeWatch and help keep your community safe
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={User}
            error={errors.fullName?.message}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />

          <Input
            label="Mobile Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            icon={Phone}
            error={errors.mobile?.message}
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
                message: 'Invalid mobile number',
              },
            })}
          />

          {/* Role Selector */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">
              Account Type <span className="text-red-400 ml-0.5">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'citizen' as const, label: 'Citizen', desc: 'Report & track crimes' },
                { value: 'police' as const, label: 'Police Officer', desc: 'Manage & investigate' },
              ].map((role) => (
                <label
                  key={role.value}
                  className={`relative flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    watch('role') === role.value
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    value={role.value}
                    className="sr-only"
                    {...register('role')}
                  />
                  <span className="text-sm font-semibold text-white">{role.label}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{role.desc}</span>
                  {watch('role') === role.value && (
                    <motion.div
                      layoutId="roleIndicator"
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <CheckCircle className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </label>
              ))}
            </div>
          </div>

          <PasswordInput
            label="Password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
          />

          {/* Password Strength Indicator */}
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex gap-1">
                {passwordRules.map((rule) => (
                  <div
                    key={rule.label}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      rule.test(password) ? 'bg-emerald-500' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-1">
                {passwordRules.map((rule) => (
                  <div key={rule.label} className="flex items-center gap-1.5">
                    {rule.test(password) ? (
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <XCircle className="w-3 h-3 text-slate-600" />
                    )}
                    <span
                      className={`text-xs ${
                        rule.test(password) ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-white/20 bg-navy-950/50 text-blue-500 focus:ring-blue-500/20 focus:ring-offset-0 cursor-pointer"
              {...register('agreeTerms', { required: true })}
            />
            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
              I agree to the{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                Terms &amp; Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Submit */}
          <Button type="submit" fullWidth loading={loading} size="lg">
            Create Account
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
