import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="space-y-1.5 font-tech">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
          {label}
          {props.required && <span className="text-cyber-pink ml-0.5">*</span>}
        </label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyber-cyan glow-cyan">
            <Lock className="w-4.5 h-4.5" />
          </div>
          <input
            ref={ref}
            type={visible ? 'text' : 'password'}
            className={`w-full bg-cyber-void/70 border ${
              error ? 'border-cyber-pink/55 focus:border-cyber-pink' : 'border-cyber-cyan/20 focus:border-cyber-cyan/60'
            } rounded-none pl-11 pr-11 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none transition-all duration-200 focus:ring-2 ${
              error ? 'focus:ring-cyber-pink/10' : 'focus:ring-cyber-cyan/10'
            } ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cyber-cyan hover:text-white transition-colors"
            tabIndex={-1}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
          </button>
        </div>
        {error && (
          <p className="text-xs text-cyber-pink mt-1">{error}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
