import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Interactive Map', href: '/map' },
  { label: 'Report Crime', href: '/reports' },
  { label: 'Crime Trends', href: '/dashboard' },
  { label: 'About', href: '/#features' },
  { label: 'Contact', href: '/#footer' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-void/95 backdrop-blur-xl shadow-lg shadow-black/40 border-b border-cyber-cyan/15 glow-border-cyan'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative font-orbitron">
              <Shield className="w-8 h-8 text-cyber-cyan group-hover:text-cyber-green transition-colors glow-cyan" />
              <div className="absolute inset-0 bg-cyber-cyan/20 rounded-full blur-md group-hover:bg-cyber-green/30 transition-colors" />
            </div>
            <span className="text-xl font-black tracking-widest font-orbitron">
              <span className="text-white">CRIME</span>
              <span className="text-cyber-cyan glow-cyan group-hover:text-cyber-green group-hover:glow-green transition-colors">WATCH</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 font-tech">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-2 text-sm tracking-wide text-slate-400 hover:text-cyber-cyan rounded hover:bg-cyber-cyan/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4 font-tech">
            {token ? (
              <>
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="px-4 py-2 text-sm text-cyber-cyan hover:text-white transition-all duration-200 uppercase tracking-wider"
                >
                  // DASHBOARD
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-bold text-cyber-pink border border-transparent rounded-none transition-all duration-200 cursor-pointer chamfer-button uppercase tracking-wider hover:bg-cyber-pink/5 hover:border-cyber-pink/20"
                >
                  SYS_LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-slate-355 hover:text-cyber-cyan hover:glow-cyan transition-all duration-200"
                >
                  // LOGIN
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-semibold text-cyber-void bg-cyber-cyan hover:bg-cyber-green rounded transition-all duration-200 shadow-[0_0_15px_rgba(0,212,255,0.35)] hover:shadow-[0_0_15px_rgba(0,255,136,0.35)] chamfer-button"
                >
                  SYS_REGISTER
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-cyber-void/95 backdrop-blur-xl border-t border-cyber-cyan/15"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 font-tech">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base text-slate-400 hover:text-cyber-cyan rounded hover:bg-cyber-cyan/5 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-cyber-cyan/15 flex flex-col gap-2">
                {token ? (
                  <>
                    <Link
                      to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm text-cyber-cyan hover:text-white rounded hover:bg-white/5 transition-all text-center uppercase"
                    >
                      // DASHBOARD
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="px-4 py-3 text-sm font-bold text-cyber-pink hover:bg-cyber-pink/5 border border-transparent rounded-none transition-all text-center cursor-pointer chamfer-button uppercase"
                    >
                      SYS_LOGOUT
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm text-slate-300 hover:text-cyber-cyan rounded hover:bg-white/5 transition-all text-center"
                    >
                      // LOGIN
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm font-semibold text-cyber-void bg-cyber-cyan hover:bg-cyber-green rounded transition-all text-center shadow-[0_0_15px_rgba(0,212,255,0.25)] chamfer-button"
                    >
                      SYS_REGISTER
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
