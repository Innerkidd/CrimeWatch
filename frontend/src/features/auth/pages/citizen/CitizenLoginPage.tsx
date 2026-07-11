import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, LogIn, Loader2, Home } from 'lucide-react';
import { mockLogin } from '../../services/mockAuth';
import { DemoCredentialsCard } from '../../components/DemoCredentialsCard';

interface FormData {
  email: string;
  password: string;
}

export const CitizenLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: 'citizen@crimewatch.com',
      password: 'Citizen@123',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    const result = await mockLogin(data.email, data.password, 'citizen');

    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('cw_remember', 'citizen');
      }
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cyber-void font-tech flex items-center justify-center p-4 relative overflow-hidden scanlines">
      {/* HUD Background Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="relative w-full max-w-md z-10 space-y-6">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-cyber-cyan transition-colors"
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-cyber-cyan/10 border border-cyber-cyan/35 mb-4 glow-border-cyan animate-pulse">
            <Shield className="w-8 h-8 text-cyber-cyan glow-cyan" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-widest font-orbitron text-white">
            CRIME<span className="text-cyber-cyan glow-cyan">WATCH</span>
          </h1>
          <p className="text-xs text-cyber-cyan/80 mt-1.5 uppercase font-bold tracking-wider">// CITIZEN_PORTAL_GATEWAY</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hud-panel p-6 sm:p-8 relative bg-cyber-void border border-cyber-cyan/20 hover:border-cyber-cyan/35 transition-colors duration-300"
        >
          {/* HUD Corner Brackets */}
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />

          <h2 className="text-lg font-bold font-orbitron uppercase text-white mb-1 tracking-wider">MAINFRAME_ACCESS</h2>
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-5">// Enter authentication protocol keys</p>

          {error && (
            <div className="mb-4 p-3 rounded-none bg-cyber-pink/10 border border-cyber-pink/30 text-xs font-bold uppercase tracking-wider text-cyber-pink glow-pink animate-pulse">
              [SYSTEM_ERROR]: {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-cyan glow-cyan" />
                <input
                  {...register('email', { required: 'Email coordinates required' })}
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-none bg-cyber-void border border-cyber-cyan/20 text-sm text-cyber-cyan placeholder-cyber-cyan/30 focus:outline-none focus:border-cyber-cyan/60 focus:ring-1 focus:ring-cyber-cyan/15 transition-all font-mono"
                  placeholder="citizen@crimewatch.com"
                />
              </div>
              {errors.email && <p className="text-[10px] font-bold text-cyber-pink mt-1 uppercase tracking-wide">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Access Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-cyan glow-cyan" />
                <input
                  {...register('password', { required: 'Decryption password required' })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-2.5 rounded-none bg-cyber-void border border-cyber-cyan/20 text-sm text-cyber-cyan placeholder-cyber-cyan/30 focus:outline-none focus:border-cyber-cyan/60 focus:ring-1 focus:ring-cyber-cyan/15 transition-all font-mono"
                  placeholder="Enter decryption password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-cyber-cyan" /> : <Eye className="w-4 h-4 text-cyber-cyan" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] font-bold text-cyber-pink mt-1 uppercase tracking-wide">{errors.password.message}</p>}
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-bold">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-none border-cyber-cyan/30 bg-cyber-void/50 text-cyber-cyan focus:ring-cyber-cyan/20 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-400 group-hover:text-cyber-cyan transition-colors">Remember Node</span>
              </label>
              <Link to="/forgot-password" className="text-cyber-pink hover:text-white transition-colors">
                Forgot Pass?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyber-cyan hover:bg-cyber-green text-cyber-void font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.25)] hover:shadow-[0_0_20px_rgba(0,255,136,0.35)] chamfer-button cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin text-cyber-void" />
              ) : (
                <>
                  <LogIn className="w-4.5 h-4.5 text-cyber-void" />
                  Decrypt Sign In
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Demo Credentials */}
        <DemoCredentialsCard role="citizen" />

        {/* Register Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs font-bold uppercase tracking-wider text-slate-450 mt-4"
        >
          Node Unregistered?{' '}
          <Link to="/register" className="text-cyber-cyan hover:text-cyber-green transition-colors font-bold">
            Create Secure Node
          </Link>
        </motion.p>
      </div>
    </div>
  );
};

export default CitizenLoginPage;
