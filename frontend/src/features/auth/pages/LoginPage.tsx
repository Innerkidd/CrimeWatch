import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Shield } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { PasswordInput } from '@/shared/components/ui/PasswordInput';
import { Button } from '@/shared/components/ui/Button';
import { ToastContainer, type ToastItem } from '@/shared/components/ui/Toast';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginPage = () => {
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
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem(
        'user',
        JSON.stringify({ email: data.email, role: data.email.includes('admin') ? 'admin' : 'user' })
      );

      addToast('success', 'ACCESS GRANTED. REDIRECTING NODE...');

      setTimeout(() => {
        if (data.email.includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    } catch {
      addToast('error', 'AUTH FAILURE. INVALID KEY / CODE.');
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
            MAINFRAME_ACCESS
          </h2>
          <p className="text-xs text-slate-450 font-tech uppercase tracking-wide">
            // AUTHENTICATION_PROTOCOL_REQUIRED
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
          <Input
            label="EMAIL ADDRESS"
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

          <PasswordInput
            label="ACCESS PASSWORD"
            placeholder="DECRYPT PASS..."
            error={errors.password?.message}
            {...register('password', {
              required: 'Decryption password required',
              minLength: { value: 6, message: 'Password must exceed 5 indices' },
            })}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between font-tech text-xs tracking-wider uppercase">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-none border-cyber-cyan/30 bg-cyber-void/50 text-cyber-cyan focus:ring-cyber-cyan/20 focus:ring-offset-0 cursor-pointer"
                {...register('rememberMe')}
              />
              <span className="text-slate-400 group-hover:text-cyber-cyan transition-colors">
                REMEMBER_NODE
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="font-medium text-cyber-pink hover:text-white transition-colors"
            >
              FORGOT_PASS?
            </Link>
          </div>

          {/* Submit */}
          <Button type="submit" fullWidth loading={loading} size="lg">
            DECRYPT_LOGIN
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8 z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cyber-cyan/15" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-cyber-void font-tech text-[10px] text-slate-500 uppercase tracking-widest">
              SECURE_GATEWAY
            </span>
          </div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-cyber-cyan/5 hover:bg-cyber-cyan/15 border border-cyber-cyan/35 text-xs font-bold font-tech uppercase rounded-none transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,212,255,0.25)] chamfer-button"
        >
          <svg className="w-5 h-5 text-cyber-cyan glow-cyan" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              opacity="0.8"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              opacity="0.6"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              opacity="0.9"
            />
          </svg>
          Google_Mainframe
        </button>

        {/* Register Link */}
        <p className="mt-8 text-center text-xs font-tech uppercase tracking-wide text-slate-450 relative z-10">
          NODE UNREGISTERED?{' '}
          <Link
            to="/register"
            className="font-bold text-cyber-cyan hover:text-cyber-green transition-colors"
          >
            CREATE_SECURE_NODE
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
