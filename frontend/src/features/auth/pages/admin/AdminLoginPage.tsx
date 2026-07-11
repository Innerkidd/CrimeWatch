import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, LogIn, Loader2, Home, Settings } from 'lucide-react';
import { mockLogin } from '../../services/mockAuth';
import { DemoCredentialsCard } from '../../components/DemoCredentialsCard';

interface FormData {
  email: string;
  password: string;
}

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: 'admin@crimewatch.com',
      password: 'Admin@123',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    const result = await mockLogin(data.email, data.password, 'admin');

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Login failed.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cyber-void font-tech flex items-center justify-center p-4 relative overflow-hidden scanlines">
      {/* HUD Background Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,0,119,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,119,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="relative w-full max-w-md z-10 space-y-6">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-cyber-pink transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          // BACK_TO_HOME
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-cyber-pink/10 border border-cyber-pink/35 mb-4 relative glow-border-pink animate-pulse">
            <Settings className="w-8 h-8 text-cyber-pink glow-pink" />
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-none bg-cyber-pink flex items-center justify-center shadow-[0_0_8px_rgba(255,0,119,0.4)]">
              <Shield className="w-3 h-3 text-cyber-void" />
            </div>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-widest font-orbitron text-white">
            CRIME<span className="text-cyber-pink glow-pink">WATCH</span>
          </h1>
          <p className="text-xs text-cyber-pink/80 mt-1.5 uppercase font-bold tracking-wider">// ROOT_ADMIN_GATEWAY</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hud-panel p-6 sm:p-8 relative bg-cyber-void border border-cyber-pink/20 hover:border-cyber-pink/35 transition-colors duration-300"
        >
          {/* HUD Corner Brackets */}
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />

          <h2 className="text-lg font-bold font-orbitron uppercase text-white mb-1 tracking-wider">ROOT_CORE_ACCESS</h2>
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-5">// Authorize administrator credentials</p>

          {error && (
            <div className="mb-4 p-3 rounded-none bg-cyber-pink/10 border border-cyber-pink/30 text-xs font-bold uppercase tracking-wider text-cyber-pink glow-pink animate-pulse">
              [ROOT_ACCESS_DENIED]: {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-pink glow-pink" />
                <input
                  {...register('email', { required: 'Email credentials required' })}
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-none bg-cyber-void border border-cyber-pink/20 text-sm text-cyber-pink placeholder-cyber-pink/30 focus:outline-none focus:border-cyber-pink/60 focus:ring-1 focus:ring-cyber-pink/15 transition-all font-mono"
                  placeholder="admin@crimewatch.com"
                />
              </div>
              {errors.email && <p className="text-[10px] font-bold text-cyber-pink mt-1 uppercase tracking-wide">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-pink glow-pink" />
                <input
                  {...register('password', { required: 'Admin password required' })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-2.5 rounded-none bg-cyber-void border border-cyber-pink/20 text-sm text-cyber-pink placeholder-cyber-pink/30 focus:outline-none focus:border-cyber-pink/60 focus:ring-1 focus:ring-cyber-pink/15 transition-all font-mono"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-cyber-pink" /> : <Eye className="w-4 h-4 text-cyber-pink" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] font-bold text-cyber-pink mt-1 uppercase tracking-wide">{errors.password.message}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyber-pink hover:bg-cyber-pink/80 text-cyber-void font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,0,119,0.25)] hover:shadow-[0_0_20px_rgba(255,0,119,0.35)] chamfer-button cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin text-cyber-void" />
              ) : (
                <>
                  <LogIn className="w-4.5 h-4.5 text-cyber-void" />
                  Decrypt Admin Session
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Demo Credentials */}
        <DemoCredentialsCard role="admin" />
      </div>
    </div>
  );
};

export default AdminLoginPage;
