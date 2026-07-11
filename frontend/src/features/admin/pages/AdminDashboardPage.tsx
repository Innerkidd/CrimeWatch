import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  LayoutDashboard,
  Map,
  FileText,
  ShieldAlert,
  BarChart2,
  Bell,
  Settings,
  Search,
  LogOut,
  ChevronDown,
  Activity,
  Menu,
  X
} from 'lucide-react';

// Hook
import { useAdminState } from '../hooks/useAdminState';

// Components
import { StatCards } from '../components/StatCards';
import { IncidentMap } from '../components/IncidentMap';
import { ReportsTable } from '../components/ReportsTable';
import { InvestigationManager } from '../components/InvestigationManager';
import { OfficerManagement } from '../components/OfficerManagement';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { EmergencyAlertCenter } from '../components/EmergencyAlertCenter';
import { SystemActivityFeed } from '../components/SystemActivityFeed';
import { QuickActionPanel } from '../components/QuickActionPanel';
import { ToastContainer } from '../components/ToastContainer';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const state = useAdminState();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'reports' | 'investigations' | 'officers' | 'analytics' | 'alerts' | 'logs' | 'settings'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Live Crime Map', icon: Map },
    { id: 'reports', label: 'All Reports', icon: FileText },
    { id: 'investigations', label: 'Investigations', icon: Activity },
    { id: 'officers', label: 'Officers', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'alerts', label: 'Emergency Alerts', icon: ShieldAlert },
    { id: 'logs', label: 'Operations Feed', icon: Activity },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 bg-slate-950 border-r border-slate-800 flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-850 gap-3">
          <Shield className="w-8 h-8 text-indigo-500 animate-pulse" />
          <span className="font-black text-lg tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            CRIMEWATCH
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-850">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/20 transition-all duration-200"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout Panel</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-850 bg-slate-950/40 backdrop-blur px-6 lg:px-8 flex items-center justify-between z-30">
          {/* Mobile Menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Shield className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-sm tracking-wide text-slate-100">CrimeWatch</span>
          </div>

          {/* Global search */}
          <div className="hidden md:flex relative w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search reports, badges, locations..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Actions & Alerts */}
          <div className="flex items-center gap-4">
            {/* System Health */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SmartCity Grid Online</span>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors relative"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl p-3 w-72 shadow-2xl z-40 space-y-2">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Alerts Center</span>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {state.alerts.map((a) => (
                        <div key={a.id} className="text-xs bg-slate-900 p-2 rounded-lg border border-slate-850">
                          <span className="font-bold text-rose-400 block">{a.type}</span>
                          <p className="text-slate-300 text-[10px] mt-0.5">{a.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-slate-100 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-[10px]">
                  AD
                </div>
                <span className="hidden sm:inline">Admin Desk</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl p-2 w-48 shadow-2xl z-40 space-y-1 text-left">
                    <button
                      onClick={() => {
                        setActiveTab('settings');
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-900 text-xs rounded-lg text-slate-300 hover:text-indigo-400 font-semibold"
                    >
                      System Configurations
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

        {/* Content Body */}
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
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Stats Summary */}
                  <StatCards reports={state.reports} officers={state.officers} />

                  {/* Actions Bar */}
                  <QuickActionPanel
                    onVerifyClick={() => setActiveTab('reports')}
                    onAddOfficerClick={() => setActiveTab('officers')}
                    onBroadcastClick={() => setActiveTab('alerts')}
                    onOpenMapClick={() => setActiveTab('map')}
                    onExportClick={() => alert('Exporting all crime records as CSV...')}
                  />

                  {/* Split Table & side details */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-6">
                      <ReportsTable
                        reports={state.reports}
                        officers={state.officers}
                        onVerify={state.verifyReport}
                        onReject={state.rejectReport}
                        onAssign={state.assignOfficer}
                      />
                    </div>

                    <div className="space-y-8">
                      {/* Emergency alerts summary */}
                      <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <EmergencyAlertCenter alerts={state.alerts} onBroadcast={state.broadcastAlert} />
                      </div>

                      {/* Operations Audit feed summary */}
                      <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <SystemActivityFeed logs={state.logs} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <IncidentMap
                  reports={state.reports}
                  officers={state.officers}
                  onVerify={state.verifyReport}
                  onReject={state.rejectReport}
                  onAssign={state.assignOfficer}
                />
              )}

              {activeTab === 'reports' && (
                <ReportsTable
                  reports={state.reports}
                  officers={state.officers}
                  onVerify={state.verifyReport}
                  onReject={state.rejectReport}
                  onAssign={state.assignOfficer}
                />
              )}

              {activeTab === 'investigations' && (
                <InvestigationManager
                  investigations={state.investigations}
                  onUpdateProgress={state.updateProgress}
                  onCloseCase={state.closeCase}
                />
              )}

              {activeTab === 'officers' && (
                <OfficerManagement officers={state.officers} onAddOfficer={state.addOfficer} />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsDashboard reports={state.reports} />
              )}

              {activeTab === 'alerts' && (
                <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl">
                  <EmergencyAlertCenter alerts={state.alerts} onBroadcast={state.broadcastAlert} />
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl">
                  <SystemActivityFeed logs={state.logs} />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">Global System Settings</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Configure operational bounds and alert radius</p>
                  </div>

                  <form className="space-y-4 text-xs" onSubmit={(e) => { e.preventDefault(); alert('Configurations saved!'); }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">SMS Alert Radius (km)</label>
                        <input type="number" defaultValue={5} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500" />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">Max Dispatch Load/Officer</label>
                        <input type="number" defaultValue={4} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500" />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-900">
                      <button type="submit" className="bg-indigo-650 hover:bg-indigo-600 px-5 py-2 rounded-lg text-white font-bold transition-all">
                        Save Configurations
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="h-12 border-t border-slate-850 bg-slate-950/20 px-6 lg:px-8 flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          <span>CrimeWatch System v1.0.0</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Operations</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Support Center</a>
          </div>
          <span>&copy; 2026 CrimeWatch Command. All rights reserved.</span>
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
              className="relative w-64 bg-slate-950 border-r border-slate-850 flex flex-col z-10"
            >
              <div className="h-16 flex items-center px-6 border-b border-slate-850 justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-indigo-500" />
                  <span className="font-bold text-sm text-slate-100">CrimeWatch</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-900/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-850">
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

      {/* Floating Toast Notification Box */}
      <ToastContainer toasts={state.toasts} onRemove={state.removeToast} />
    </div>
  );
};
export default AdminDashboardPage;
