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
  { icon: Settings, label: 'Settings', href: '/profile' }, // point settings directly to profile options
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
    <div className="flex h-screen bg-cyber-void text-slate-100 font-tech overflow-hidden scanlines relative">
      {/* HUD Background Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cyber-void/80 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-cyber-void border-r border-cyber-cyan/15 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-cyber-cyan/15 relative z-10">
          {!collapsed && (
            <div className="flex items-center gap-2.5 font-orbitron">
              <div className="w-8 h-8 rounded-none bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center glow-border-cyan animate-pulse">
                <Shield className="w-5 h-5 text-cyber-cyan" />
              </div>
              <span className="font-black text-sm tracking-widest">
                <span className="text-white">CRIME</span>
                <span className="text-cyber-cyan glow-cyan">WATCH</span>
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-none bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center mx-auto glow-border-cyan animate-pulse">
              <Shield className="w-5 h-5 text-cyber-cyan" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-6 h-6 items-center justify-center rounded-none hover:bg-cyber-cyan/10 text-slate-500 hover:text-cyber-cyan transition-colors cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto relative z-10 font-tech uppercase text-xs tracking-wider">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.href);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-none font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan glow-cyan chamfer-button'
                    : 'text-slate-400 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-cyber-cyan glow-cyan' : ''}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-cyber-cyan/15 space-y-2 relative z-10 font-tech uppercase text-xs tracking-wider">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-none font-bold text-slate-400 hover:text-cyber-cyan hover:bg-cyber-cyan/5 transition-all duration-200 cursor-pointer ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Home' : undefined}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Home Portal</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-none font-bold text-cyber-pink hover:text-white hover:bg-cyber-pink/5 border border-transparent hover:border-cyber-pink/20 transition-all duration-200 cursor-pointer chamfer-button ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout Node</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Navbar */}
        <header className="h-16 border-b border-cyber-cyan/15 bg-cyber-void/80 backdrop-blur px-4 lg:px-6 flex items-center justify-between gap-4 flex-shrink-0">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-cyber-cyan hover:text-white rounded-none hover:bg-cyber-cyan/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative z-10 font-tech">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-cyan glow-cyan" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="CMD: SEARCH SECURITY DB..."
                className="w-full bg-cyber-void border border-cyber-cyan/25 rounded-none pl-10 pr-4 py-2 text-sm text-cyber-cyan placeholder-cyber-cyan/40 outline-none focus:border-cyber-cyan/60 focus:ring-1 focus:ring-cyber-cyan/10 transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-cyber-cyan hover:text-white rounded-none hover:bg-cyber-cyan/5 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyber-pink animate-ping glow-pink" />
            </button>

            {/* System Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-none bg-cyber-green/10 border border-cyber-green/30 font-tech glow-green relative z-10">
              <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-pulse glow-green" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyber-green">SYS_SECURE</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative font-tech uppercase">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-none hover:bg-cyber-cyan/5 transition-colors cursor-pointer text-cyber-cyan hover:text-white"
              >
                <div className="w-8 h-8 rounded-none bg-cyber-cyan/15 border border-cyber-cyan/35 flex items-center justify-center text-sm font-bold text-cyber-cyan glow-cyan">
                  {userInitial}
                </div>
                <span className="hidden sm:block text-xs font-bold tracking-wider max-w-[100px] truncate">
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
                    className="absolute right-0 top-full mt-2 w-56 bg-cyber-void rounded-none border border-cyber-cyan/25 shadow-2xl overflow-hidden z-50 text-left"
                  >
                    <div className="p-3 border-b border-cyber-cyan/15 font-tech">
                      <p className="text-xs font-bold text-white font-orbitron tracking-wider">{userName}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{user.email || 'user@crimewatch.gov'}</p>
                    </div>
                    <div className="p-1.5 font-tech uppercase text-xs tracking-wider">
                      <button
                        onClick={() => { navigate('/profile'); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-cyber-cyan hover:text-white hover:bg-cyber-cyan/10 rounded-none transition-colors cursor-pointer text-left font-bold"
                      >
                        <User className="w-4 h-4 text-cyber-cyan" />
                        PROFILE_INIT
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-cyber-pink hover:text-white hover:bg-cyber-pink/10 rounded-none transition-colors cursor-pointer text-left font-bold"
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
