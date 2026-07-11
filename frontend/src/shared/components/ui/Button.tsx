import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const variants = {
  primary:
    'bg-cyber-cyan hover:bg-cyber-green text-cyber-void shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]',
  secondary:
    'bg-cyber-cyan/5 hover:bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30',
  danger:
    'bg-cyber-pink hover:bg-cyber-pink/90 text-white shadow-[0_0_15px_rgba(255,0,119,0.3)]',
  ghost:
    'bg-transparent hover:bg-cyber-cyan/10 border border-transparent text-slate-400 hover:text-cyber-cyan',
};

const sizes = {
  sm: 'px-4 py-2 text-xs tracking-wide',
  md: 'px-6 py-2.5 text-sm tracking-wider',
  lg: 'px-8 py-3.5 text-base tracking-widest',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 font-tech font-bold uppercase chamfer-button rounded-none transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size="sm" />
            <span>Please wait...</span>
          </>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
