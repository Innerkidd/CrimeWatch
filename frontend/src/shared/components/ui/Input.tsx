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
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {props.required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              <Icon className="w-4.5 h-4.5" />
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-navy-950/50 border ${
              error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
            } rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 ${
              error ? 'focus:ring-red-500/20' : 'focus:ring-blue-500/20'
            } ${Icon && iconPosition === 'left' ? 'pl-11' : ''} ${Icon && iconPosition === 'right' ? 'pr-11' : ''} ${className}`}
            {...props}
          />
          {Icon && iconPosition === 'right' && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              <Icon className="w-4.5 h-4.5" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
