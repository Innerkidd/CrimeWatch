import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, LogIn, Loader2, Home, BadgeCheck } from 'lucide-react';
import { mockLogin } from '../../services/mockAuth';
import { DemoCredentialsCard } from '../../components/DemoCredentialsCard';

interface FormData {
  identifier: string;
  password: string;
}

export const PoliceLoginPage = () => {
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
      identifier: 'police@crimewatch.com',
      password: 'Police@123',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    const result = await mockLogin(data.identifier, data.password, 'police');

    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('cw_remember', 'police');
      }
      navigate('/police/dashboard');
    } else {
      setError(result.message || 'Login failed.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cyber-void font-tech flex items-center justify-center p-4 relative overflow-hidden scanlines">
      {/* HUD Background Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,179,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,179,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="relative w-full max-w-md z-10 space-y-6">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-cyber-yellow transition-colors"
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-cyber-yellow/10 border border-cyber-yellow/35 mb-4 relative glow-border-yellow animate-pulse">
            <Shield className="w-8 h-8 text-cyber-yellow glow-yellow" />
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-none bg-cyber-yellow flex items-center justify-center shadow-[0_0_8px_rgba(255,179,0,0.4)]">
              <BadgeCheck className="w-3 h-3 text-cyber-void" />
            </div>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-widest font-orbitron text-white">
            CRIME<span className="text-cyber-yellow glow-yellow">WATCH</span>
          </h1>
          <p className="text-xs text-cyber-yellow/80 mt-1.5 uppercase font-bold tracking-wider">// ENFORCEMENT_NODE_GATEWAY</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hud-panel p-6 sm:p-8 relative bg-cyber-void border border-cyber-yellow/20 hover:border-cyber-yellow/35 transition-colors duration-300"
        >
          {/* HUD Corner Brackets */}
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />

          <h2 className="text-lg font-bold font-orbitron uppercase text-white mb-1 tracking-wider">OFFICER_ACCESS</h2>
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-5">// Authorize law enforcement identity</p>

          {error && (
            <div className="mb-4 p-3 rounded-none bg-cyber-pink/10 border border-cyber-pink/30 text-xs font-bold uppercase tracking-wider text-cyber-pink glow-pink animate-pulse">
              [ACCESS_FAILURE]: {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Badge Number / Email */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Badge Number or Email
              </label>
              <div className="relative">
                <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-yellow glow-yellow" />
                <input
                  {...register('identifier', { required: 'Badge number or email is required' })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-none bg-cyber-void border border-cyber-yellow/20 text-sm text-cyber-yellow placeholder-cyber-yellow/30 focus:outline-none focus:border-cyber-yellow/60 focus:ring-1 focus:ring-cyber-yellow/15 transition-all font-mono"
                  placeholder="PO-2024-001 or email"
                />
              </div>
              {errors.identifier && <p className="text-[10px] font-bold text-cyber-pink mt-1 uppercase tracking-wide">{errors.identifier.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Access Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-yellow glow-yellow" />
                <input
                  {...register('password', { required: 'Password credentials required' })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-2.5 rounded-none bg-cyber-void border border-cyber-yellow/20 text-sm text-cyber-yellow placeholder-cyber-yellow/30 focus:outline-none focus:border-cyber-yellow/60 focus:ring-1 focus:ring-cyber-yellow/15 transition-all font-mono"
                  placeholder="Enter access password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-cyber-yellow" /> : <Eye className="w-4 h-4 text-cyber-yellow" />}
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
                  className="w-4 h-4 rounded-none border-cyber-yellow/30 bg-cyber-void/50 text-cyber-yellow focus:ring-cyber-yellow/20 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-400 group-hover:text-cyber-yellow transition-colors">Remember Node</span>
              </label>
              <Link to="/forgot-password" className="text-cyber-pink hover:text-white transition-colors">
                Forgot Pass?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyber-yellow hover:bg-cyber-yellow/80 text-cyber-void font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,179,0,0.25)] hover:shadow-[0_0_20px_rgba(255,179,0,0.35)] chamfer-button cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin text-cyber-void" />
              ) : (
                <>
                  <LogIn className="w-4.5 h-4.5 text-cyber-void" />
                  Decrypt Enforcement
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Demo Credentials */}
        <DemoCredentialsCard role="police" />
      </div>
    </div>
  );
};

export default PoliceLoginPage;
