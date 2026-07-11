import { Shield } from 'lucide-react';

export const DashboardFooter = () => {
  return (
    <footer className="mt-8 py-6 border-t border-cyber-cyan/15 bg-cyber-void font-tech text-[10px] uppercase tracking-widest text-slate-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyber-cyan glow-cyan animate-pulse" />
          <span>&copy; {new Date().getFullYear()} CRIMEWATCH. SYS_GRID_ACTIVE.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-cyber-cyan transition-colors">PRIV_POLICY</a>
          <a href="#" className="hover:text-cyber-cyan transition-colors">TERMS_CONDITIONS</a>
          <a href="#" className="hover:text-cyber-cyan transition-colors">SUPPORT_NODES</a>
          <a href="#" className="text-cyber-pink glow-pink hover:text-white font-bold transition-colors">EMERGENCY_LINK: 100</a>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
