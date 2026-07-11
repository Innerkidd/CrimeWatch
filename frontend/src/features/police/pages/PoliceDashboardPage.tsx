import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  LayoutDashboard,
  Map,
  FileText,
  Activity,
  BarChart2,
  Bell,
  LogOut,
  Search,
  ChevronDown,
  Menu,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Eye,
  Loader2,
} from 'lucide-react';
import { getStoredAuth } from '@/features/auth/services/mockAuth';
import { PoliceLiveMap } from '../components/PoliceLiveMap';

interface StatCard {
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  icon: React.FC<{ className?: string }>;
  color: string;
}

const stats: StatCard[] = [
  { label: 'Pending Reports', value: '24', change: '+3 today', changeType: 'up', icon: Clock, color: 'amber' },
  { label: 'Active Investigations', value: '12', change: '+1 today', changeType: 'up', icon: Activity, color: 'blue' },
  { label: 'Resolved This Month', value: '38', change: '+5 vs last month', changeType: 'up', icon: CheckCircle2, color: 'emerald' },
  { label: 'Alerts Triggered', value: '6', change: '-2 vs yesterday', changeType: 'down', icon: AlertTriangle, color: 'red' },
];

interface PendingReport {
  id: string;
  type: string;
  location: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
}

const pendingReports: PendingReport[] = [
  { id: 'CR-2026-0421', type: 'Armed Robbery', location: '142 Oak Street', time: '12 min ago', severity: 'high' },
  { id: 'CR-2026-0420', type: 'Vehicle Theft', location: '78 Pine Avenue', time: '45 min ago', severity: 'medium' },
  { id: 'CR-2026-0419', type: 'Assault', location: '305 Main Blvd', time: '1 hr ago', severity: 'high' },
  { id: 'CR-2026-0418', type: 'Vandalism', location: '22 Elm Court', time: '2 hr ago', severity: 'low' },
  { id: 'CR-2026-0417', type: 'Burglary', location: '89 Maple Drive', time: '3 hr ago', severity: 'medium' },
];

interface Investigation {
  id: string;
  caseName: string;
  status: 'active' | 'review' | 'surveillance';
  progress: number;
  assignedTo: string;
  priority: 'critical' | 'high' | 'medium';
}

const activeInvestigations: Investigation[] = [
  { id: 'INV-1042', caseName: 'Downtown Robbery Ring', status: 'active', progress: 65, assignedTo: 'Det. Martinez', priority: 'critical' },
  { id: 'INV-1041', caseName: 'Warehouse Break-ins', status: 'surveillance', progress: 40, assignedTo: 'Det. Chen', priority: 'high' },
  { id: 'INV-1040', caseName: 'Cyber Fraud Network', status: 'review', progress: 80, assignedTo: 'Det. Patel', priority: 'high' },
  { id: 'INV-1039', caseName: 'Drug Distribution', status: 'active', progress: 55, assignedTo: 'Det. Johnson', priority: 'medium' },
];

interface RecentReport {
  id: string;
  type: string;
  location: string;
  time: string;
  status: 'verified' | 'pending' | 'dismissed';
}

const recentReports: RecentReport[] = [
  { id: 'CR-2026-0416', type: 'Theft', location: '15 Commerce Park', time: '4 hr ago', status: 'verified' },
  { id: 'CR-2026-0415', type: 'Domestic Disturbance', location: '203 River Road', time: '5 hr ago', status: 'verified' },
  { id: 'CR-2026-0414', type: 'Hit and Run', location: '67 Highway 9', time: '6 hr ago', status: 'pending' },
  { id: 'CR-2026-0413', type: 'Fraud Report', location: '410 Bank Street', time: '8 hr ago', status: 'dismissed' },
  { id: 'CR-2026-0412', type: 'Noise Complaint', location: '88 Festival Lane', time: '10 hr ago', status: 'verified' },
];

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pending', label: 'Pending Reports', icon: Clock },
  { id: 'investigations', label: 'Active Investigations', icon: Activity },
  { id: 'map', label: 'Live Crime Map', icon: Map },
  { id: 'recent', label: 'Recent Reports', icon: FileText },
  { id: 'analytics', label: 'Crime Analytics', icon: BarChart2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
] as const;

type TabId = typeof menuItems[number]['id'];

export const PoliceDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getStoredAuth();
  const user = auth?.user;
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Officer';
  const userInitial = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cw_auth');
    navigate('/police/login', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-900 items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading Police Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 bg-slate-950 border-r border-slate-800 flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
          <Shield className="w-8 h-8 text-amber-500 animate-pulse" />
          <span className="font-black text-lg tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            CRIMEWATCH
          </span>
        </div>

        <div className="px-4 pt-4 pb-2">
          <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Police Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                    : 'text-slate-400 hover:text-amber-400 hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/20 transition-all duration-200"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/40 backdrop-blur px-6 lg:px-8 flex items-center justify-between z-30">
          {/* Mobile Menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Shield className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-sm tracking-wide text-slate-100">Police Portal</span>
          </div>

          {/* Search */}
          <div className="hidden md:flex relative w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search reports, cases, locations..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Shift Active</span>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-400 hover:text-amber-400 transition-colors relative"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl p-3 w-72 shadow-2xl z-40 space-y-2">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Alerts</span>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {pendingReports.slice(0, 3).map((r) => (
                        <div key={r.id} className="text-xs bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <span className="font-bold text-amber-400 block">{r.type}</span>
                          <p className="text-slate-300 text-[10px] mt-0.5">{r.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-slate-100 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-[10px]">
                  {userInitial}
                </div>
                <span className="hidden sm:inline">{userName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl p-2 w-48 shadow-2xl z-40 space-y-1 text-left">
                    <button
                      onClick={() => { setActiveTab('notifications'); setProfileOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-900 text-xs rounded-lg text-slate-300 hover:text-amber-400 font-semibold"
                    >
                      Notifications
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 hover:bg-rose-950/20 text-xs rounded-lg text-rose-400 font-semibold flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 bg-slate-900/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Welcome */}
                  <div>
                    <h1 className="text-2xl font-bold text-slate-100">
                      Welcome back, <span className="text-amber-400">{userName}</span>
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Here&apos;s your patrol overview for today</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {stats.map((stat) => {
                      const Icon = stat.icon;
                      const colorMap: Record<string, string> = {
                        amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-400',
                        blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400',
                        emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-400',
                        red: 'from-red-500/20 to-red-600/10 border-red-500/20 text-red-400',
                      };
                      return (
                        <div key={stat.label} className={`bg-gradient-to-br ${colorMap[stat.color]} border rounded-2xl p-5`}>
                          <div className="flex items-center justify-between mb-3">
                            <Icon className="w-5 h-5 opacity-80" />
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                              stat.changeType === 'up' ? 'text-emerald-400' : stat.changeType === 'down' ? 'text-red-400' : 'text-slate-400'
                            }`}>
                              {stat.change}
                            </span>
                          </div>
                          <p className="text-3xl font-black text-white">{stat.value}</p>
                          <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pending + Investigations */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Pending Reports */}
                    <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-100">Pending Reports</h3>
                        <button onClick={() => setActiveTab('pending')} className="text-[10px] text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider">
                          View All
                        </button>
                      </div>
                      <div className="space-y-3">
                        {pendingReports.slice(0, 3).map((report) => (
                          <div key={report.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-colors">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              report.severity === 'high' ? 'bg-red-500' : report.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-200 truncate">{report.type}</p>
                              <p className="text-[10px] text-slate-500 truncate">{report.location}</p>
                            </div>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">{report.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Investigations */}
                    <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-100">Active Investigations</h3>
                        <button onClick={() => setActiveTab('investigations')} className="text-[10px] text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider">
                          View All
                        </button>
                      </div>
                      <div className="space-y-3">
                        {activeInvestigations.slice(0, 3).map((inv) => (
                          <div key={inv.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-bold text-slate-200">{inv.caseName}</p>
                              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                inv.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                                inv.priority === 'high' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {inv.priority}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${inv.progress}%` }} />
                              </div>
                              <span className="text-[10px] text-slate-500">{inv.progress}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-500">{inv.assignedTo}</span>
                              <span className={`text-[9px] font-bold uppercase ${
                                inv.status === 'active' ? 'text-emerald-400' : inv.status === 'surveillance' ? 'text-blue-400' : 'text-amber-400'
                              }`}>
                                {inv.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Officer Profile Card */}
                  <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-sm font-bold text-slate-100 mb-4">Officer Profile</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-amber-500/20 border-2 border-amber-500/30 flex items-center justify-center">
                        <span className="text-lg font-black text-amber-400">{userInitial}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-100">{userName}</p>
                        <p className="text-xs text-slate-400">{user?.email}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Badge #PO-2024-001</span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">On Duty</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pending Reports Tab */}
              {activeTab === 'pending' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100">Pending Reports</h2>
                    <p className="text-sm text-slate-400 mt-1">Reports awaiting your review and action</p>
                  </div>
                  <div className="space-y-3">
                    {pendingReports.map((report) => (
                      <div key={report.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-amber-500/30 transition-colors">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          report.severity === 'high' ? 'bg-red-500' : report.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-200">{report.type}</p>
                          <p className="text-xs text-slate-500">{report.id} &middot; {report.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">{report.time}</p>
                          <div className="flex gap-2 mt-1">
                            <button className="text-[10px] font-bold text-amber-400 hover:text-amber-300 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                              <Eye className="w-3 h-3 inline mr-1" />Review
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Investigations Tab */}
              {activeTab === 'investigations' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100">Active Investigations</h2>
                    <p className="text-sm text-slate-400 mt-1">Cases currently under investigation</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeInvestigations.map((inv) => (
                      <div key={inv.id} className="p-5 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm font-bold text-slate-200">{inv.caseName}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{inv.id}</p>
                          </div>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            inv.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                            inv.priority === 'high' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {inv.priority}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-slate-500">Progress</span>
                            <span className="text-[10px] text-slate-400">{inv.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${inv.progress}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">Assigned: <span className="text-slate-300">{inv.assignedTo}</span></span>
                          <span className={`font-bold uppercase ${
                            inv.status === 'active' ? 'text-emerald-400' : inv.status === 'surveillance' ? 'text-blue-400' : 'text-amber-400'
                          }`}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Tab */}
              {activeTab === 'map' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100">Live Crime Map</h2>
                    <p className="text-sm text-slate-400 mt-1">Real-time incident locations across your patrol area</p>
                  </div>
                  <PoliceLiveMap onOpenFullMap={() => navigate('/police/map')} />
                </div>
              )}

              {/* Recent Reports Tab */}
              {activeTab === 'recent' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100">Recent Crime Reports</h2>
                    <p className="text-sm text-slate-400 mt-1">Recently filed reports in your jurisdiction</p>
                  </div>
                  <div className="space-y-3">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-amber-500/30 transition-colors">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          report.status === 'verified' ? 'bg-emerald-500' : report.status === 'pending' ? 'bg-amber-500' : 'bg-slate-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-200">{report.type}</p>
                          <p className="text-xs text-slate-500">{report.id} &middot; <MapPin className="w-3 h-3 inline" /> {report.location}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            report.status === 'verified' ? 'bg-emerald-500/20 text-emerald-400' :
                            report.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {report.status}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-1 flex items-center justify-end gap-1">
                            <Clock className="w-3 h-3" />{report.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100">Crime Analytics</h2>
                    <p className="text-sm text-slate-400 mt-1">Crime trends and patterns in your patrol area</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Crimes This Week', value: '47', icon: TrendingUp, change: '+12%' },
                      { label: 'Most Common', value: 'Theft', icon: FileText, change: '38% of reports' },
                      { label: 'Peak Hours', value: '8PM-2AM', icon: Clock, change: '42% of incidents' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-5">
                          <Icon className="w-5 h-5 text-amber-400/60 mb-3" />
                          <p className="text-2xl font-black text-white">{item.value}</p>
                          <p className="text-xs text-slate-400 mt-1">{item.label}</p>
                          <p className="text-[10px] text-amber-400 mt-1 font-bold">{item.change}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Chart placeholder */}
                  <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-sm font-bold text-slate-100 mb-4">Weekly Crime Distribution</h3>
                    <div className="h-64 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart2 className="w-10 h-10 text-amber-500/40 mx-auto mb-2" />
                        <p className="text-xs text-slate-500">Chart rendering area</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100">Notifications</h2>
                    <p className="text-sm text-slate-400 mt-1">Stay updated on reports and case activity</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: 'New Report Assigned', desc: 'Armed robbery at 142 Oak Street has been assigned to you', time: '12 min ago', type: 'alert' },
                      { title: 'Investigation Update', desc: 'INV-1042: Witness statement collected from scene', time: '1 hr ago', type: 'info' },
                      { title: 'Shift Reminder', desc: 'Your patrol shift ends in 2 hours', time: '2 hr ago', type: 'warning' },
                      { title: 'Report Verified', desc: 'CR-2026-0416: Theft report has been verified', time: '4 hr ago', type: 'success' },
                    ].map((notif, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          notif.type === 'alert' ? 'bg-red-500' : notif.type === 'warning' ? 'bg-amber-500' : notif.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-200">{notif.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{notif.desc}</p>
                          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />{notif.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="h-12 border-t border-slate-800 bg-slate-950/20 px-6 lg:px-8 flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          <span>CrimeWatch Police Portal v1.0.0</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Operations</a>
          </div>
          <span>&copy; 2026 CrimeWatch Command</span>
        </footer>
      </div>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="relative w-64 bg-slate-950 border-r border-slate-800 flex flex-col z-10"
            >
              <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-amber-500" />
                  <span className="font-bold text-sm text-slate-100">Police Portal</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                        isActive ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-amber-400 hover:bg-slate-900/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/20 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PoliceDashboardPage;
