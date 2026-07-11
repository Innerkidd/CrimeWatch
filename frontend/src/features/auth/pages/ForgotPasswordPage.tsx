import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, Shield, Send } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { ToastContainer, type ToastItem } from '@/shared/components/ui/Toast';

interface ForgotPasswordForm {
  email: string;
}

export const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
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
  } = useForm<ForgotPasswordForm>({
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSent(true);
      addToast('success', `RESET LINK DISPATCHED TO: ${data.email}`);
    } catch {
      addToast('error', 'GRID_FAILURE: DISPATCH TERMINATED. TRY AGAIN.');
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

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-cyber-yellow/10 border border-cyber-yellow/30 mb-4 glow-border-yellow animate-pulse"
                >
                  <Mail className="w-7 h-7 text-cyber-yellow glow-yellow" />
                </motion.div>
                <h2 className="text-2xl font-black tracking-widest text-white uppercase font-orbitron mb-1">
                  RESET_DECRYPT_KEY
                </h2>
                <p className="text-xs text-slate-450 font-tech uppercase tracking-wide">
                  // PASSWORD_DECRYPTION_PROTOCOL
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
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

                <Button type="submit" fullWidth loading={loading} size="lg">
                  <Send className="w-4 h-4" />
                  DISPATCH_DECRYPT_LINK
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center relative z-10 font-tech uppercase text-xs tracking-wider">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-cyber-cyan transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-cyber-cyan glow-cyan" />
                  // BACK_TO_AUTH_PORTAL
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center py-4 relative z-10"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-cyber-green/10 border border-cyber-green/30 mb-6 glow-border-green animate-pulse"
              >
                <CheckCircle className="w-10 h-10 text-cyber-green glow-green" />
              </motion.div>

              <h2 className="text-2xl font-black tracking-widest text-white uppercase font-orbitron mb-2">
                TRANSMISSION_DISPATCHED
              </h2>
              <p className="text-xs text-slate-400 font-tech uppercase tracking-wide mb-2 leading-relaxed">
                We have transmitted an encryption key reset link to your email coordinates.
              </p>
              <p className="text-[10px] text-slate-500 font-tech uppercase tracking-wide mb-8">
                Transmission missed? check spam queue or{' '}
                <button
                  onClick={() => setSent(false)}
                  className="text-cyber-cyan hover:text-cyber-green underline bg-transparent border-none cursor-pointer p-0"
                >
                  TRANSMIT_AGAIN
                </button>
              </p>

              {/* Decorative */}
              <div className="flex items-center justify-center gap-2 mb-6 font-tech uppercase text-[10px] tracking-widest text-slate-500">
                <Shield className="w-4 h-4 text-slate-650" />
                <span>Reset token expires in 24 hours</span>
              </div>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs font-tech uppercase tracking-wider text-slate-400 hover:text-cyber-cyan transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-cyber-cyan glow-cyan" />
                // BACK_TO_AUTH_PORTAL
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
