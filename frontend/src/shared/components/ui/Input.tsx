import { forwardRef, type InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, iconPosition = 'left', className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 font-tech">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
          {label}
          {props.required && <span className="text-cyber-pink ml-0.5">*</span>}
        </label>
        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyber-cyan glow-cyan">
              <Icon className="w-4.5 h-4.5" />
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-cyber-void/70 border ${
              error ? 'border-cyber-pink/55 focus:border-cyber-pink' : 'border-cyber-cyan/20 focus:border-cyber-cyan/60'
            } rounded-none px-4 py-3 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none transition-all duration-200 focus:ring-2 ${
              error ? 'focus:ring-cyber-pink/10' : 'focus:ring-cyber-cyan/10'
            } ${Icon && iconPosition === 'left' ? 'pl-11' : ''} ${Icon && iconPosition === 'right' ? 'pr-11' : ''} ${className}`}
            {...props}
          />
          {Icon && iconPosition === 'right' && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cyber-cyan glow-cyan">
              <Icon className="w-4.5 h-4.5" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-cyber-pink mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
