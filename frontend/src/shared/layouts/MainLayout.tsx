import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Home,
  LayoutDashboard,
  Map,
  FileText,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  Search,
  Menu,
  X,
  TrendingUp,
  Settings,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Map, label: 'Interactive Map', href: '/map' },
  { icon: FileText, label: 'Report Crime', href: '/reports' },
  { icon: FileText, label: 'My Reports', href: '/my-reports' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: TrendingUp, label: 'Crime Trends', href: '/dashboard' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/dashboard' },
];

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || user.email?.split('@')[0] || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-cyber-void text-slate-100 font-sans overflow-hidden scanlines relative">
      {/* HUD Background Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-navy-950 border-r border-white/5 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 relative z-10">
          {!collapsed && (
            <div className="flex items-center gap-2.5 font-orbitron">
              <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center glow-border-cyan animate-pulse">
                <Shield className="w-5 h-5 text-cyber-cyan" />
              </div>
              <span className="font-black text-sm tracking-widest">
                <span className="text-white">CRIME</span>
                <span className="text-cyber-cyan glow-cyan">WATCH</span>
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center mx-auto glow-border-cyan animate-pulse">
              <Shield className="w-5 h-5 text-cyber-cyan" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-6 h-6 items-center justify-center rounded-md hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto relative z-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.href);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 glow-cyan font-orbitron font-bold shadow-[inset_0_0_10px_rgba(0,212,255,0.05)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 font-orbitron'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-cyber-cyan glow-cyan' : ''}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/5 space-y-1 relative z-10">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 font-orbitron transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Home' : undefined}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Home</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cyber-pink hover:text-white hover:bg-cyber-pink/10 border border-transparent hover:border-cyber-pink/20 font-orbitron transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/5 bg-navy-950/80 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between gap-4 flex-shrink-0">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-cyan glow-cyan" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="CMD: search database..."
                className="w-full bg-navy-950/60 border border-cyber-cyan/20 rounded-lg pl-10 pr-4 py-2 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/50 focus:ring-2 focus:ring-cyber-cyan/10 font-tech transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* System Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-green/10 border border-cyber-green/30 font-tech glow-green relative z-10">
              <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-pulse glow-green" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyber-green">SYS_SECURE</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
                  {userInitial}
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-300 max-[100px] truncate">
                  {userName}
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-white/5">
                      <p className="text-sm font-semibold text-white font-orbitron">{userName}</p>
                      <p className="text-xs text-slate-450 font-tech truncate">{user.email || 'user@crimewatch.gov'}</p>
                    </div>
                    <div className="p-1.5">
                      <button
                        onClick={() => { navigate('/profile'); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-tech text-cyber-cyan hover:text-white hover:bg-cyber-cyan/15 rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4 text-cyber-cyan" />
                        PROFILE_INIT
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-tech text-cyber-pink hover:text-white hover:bg-cyber-pink/15 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-cyber-pink" />
                        LOGOUT_TERMINATE
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 relative z-10 bg-cyber-void/45">
          <Outlet />
        </main>
      </div>

      {/* Click outside to close profile */}
      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
      )}
    </div>
  );
};

export default MainLayout;
