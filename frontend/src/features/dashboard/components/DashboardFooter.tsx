import { Shield } from 'lucide-react';

export const DashboardFooter = () => {
  return (
    <footer className="mt-8 py-6 border-t border-white/5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-500" />
          <span>&copy; {new Date().getFullYear()} CrimeWatch. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Contact Support</a>
          <a href="#" className="text-red-400 hover:text-red-300 font-semibold transition-colors">Emergency: 100</a>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
