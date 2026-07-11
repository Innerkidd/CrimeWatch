import { Shield } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className="absolute inset-0 rounded-full border-2 border-white/10" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
    </div>
  );
};

export const PageSpinner = () => {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Shield className="w-12 h-12 text-blue-500 animate-pulse" />
          <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-spin border-t-blue-500" />
        </div>
        <p className="text-sm text-slate-400 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};
