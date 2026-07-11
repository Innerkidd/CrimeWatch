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
  X,
  Users,
  Radio,
  Download,
  Plus,
  Clock,
} from 'lucide-react';

// Hook
import { useAdminState } from '../hooks/useAdminState';

// Components
import { StatCards } from '../components/StatCards';
import { AdminLiveMap } from '../components/AdminLiveMap';
import { ReportsTable } from '../components/ReportsTable';
import { InvestigationManager } from '../components/InvestigationManager';
import { OfficerManagement } from '../components/OfficerManagement';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { EmergencyAlertCenter } from '../components/EmergencyAlertCenter';
import { SystemActivityFeed } from '../components/SystemActivityFeed';
import { OfficerStatusPanel } from '../components/OfficerStatusPanel';
import { SystemHealthPanel } from '../components/SystemHealthPanel';
import { ToastContainer } from '../components/ToastContainer';
import { CitizenManagement } from '../components/CitizenManagement';
import { getStoredAuth } from '@/features/auth/services/mockAuth';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const state = useAdminState();

  const auth = getStoredAuth();
  const adminUser = auth?.user;
  const adminName = adminUser ? `${adminUser.firstName} ${adminUser.lastName}`.trim() : 'Admin';
  const adminInitial = adminName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'reports' | 'investigations' | 'officers' | 'citizens' | 'analytics' | 'alerts' | 'logs' | 'settings'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('cw_auth');
    navigate('/admin/login', { replace: true });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Crime Map', icon: Map },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'investigations', label: 'Investigations', icon: Activity },
    { id: 'officers', label: 'Officers', icon: Shield },
    { id: 'citizens', label: 'Citizens', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'alerts', label: 'Emergency Alerts', icon: ShieldAlert },
    { id: 'logs', label: 'Operations Feed', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen bg-cyber-void text-slate-100 font-tech overflow-hidden relative">
      {/* Scanline CRT overlay */}
      <div className="scanlines z-50 pointer-events-none" />

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 bg-cyber-void border-r border-cyber-cyan/15 flex-col z-20 relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="h-16 flex items-center px-6 border-b border-cyber-cyan/15 gap-3 font-orbitron relative z-10">
          <Shield className="w-7 h-7 text-cyber-cyan glow-cyan animate-pulse" />
          <span className="font-black text-base tracking-widest text-white">
            CRIMEWATCH
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto relative z-10 font-tech uppercase text-xs tracking-wider">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan glow-cyan chamfer-button'
                    : 'text-slate-400 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cyber-cyan/15 relative z-10 font-tech uppercase text-xs tracking-wider">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-none text-cyber-pink border border-transparent hover:border-cyber-pink/35 hover:bg-cyber-pink/5 transition-all duration-200 cursor-pointer chamfer-button"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout Panel</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Navbar */}
        <header className="h-16 border-b border-cyber-cyan/15 bg-cyber-void/80 backdrop-blur px-6 lg:px-8 flex items-center justify-between z-30 relative">
          {/* Mobile Menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 bg-cyber-void border border-cyber-cyan/20 rounded-none text-cyber-cyan hover:text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Shield className="w-6 h-6 text-cyber-cyan glow-cyan" />
            <span className="font-bold text-sm tracking-widest text-slate-100 font-orbitron">CRIMEWATCH</span>
          </div>

          {/* Global search */}
          <div className="hidden md:flex relative w-80 font-tech">
            <Search className="absolute left-3 top-3 w-4 h-4 text-cyber-cyan glow-cyan" />
            <input
              type="text"
              placeholder="SEARCH METADATA..."
              className="w-full bg-cyber-void border border-cyber-cyan/20 rounded-none pl-9 pr-4 py-2 text-xs text-cyber-cyan placeholder-cyber-cyan/40 focus:outline-none focus:border-cyber-cyan/60 focus:ring-1 focus:ring-cyber-cyan/10"
            />
          </div>

          {/* Actions & Alerts */}
          <div className="flex items-center gap-4">
            {/* System Health */}
            <div className="hidden sm:flex items-center gap-2 font-tech uppercase text-[10px]">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse glow-green" />
              <span className="text-cyber-green glow-green font-bold tracking-wider">SYSTEM_SECURE_GRID_SYNC</span>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 bg-cyber-void border border-cyber-cyan/20 rounded-none text-cyber-cyan hover:text-white cursor-pointer relative"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyber-pink animate-ping glow-pink" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 bg-cyber-void border border-cyber-cyan/20 rounded-none p-3 w-72 shadow-2xl z-40 space-y-2 font-tech uppercase">
                    <span className="text-[10px] text-cyber-pink glow-pink font-bold block tracking-widest">// ALERTS_CENTER</span>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {state.alerts.map((a) => (
                        <div key={a.id} className="text-[10px] bg-cyber-cyan/5 p-2 border border-cyber-cyan/15 rounded-none">
                          <span className="font-bold text-cyber-pink glow-pink block">{a.type}</span>
                          <p className="text-slate-350 mt-0.5 leading-normal">{a.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative font-tech uppercase">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-cyber-void border border-cyber-cyan/20 px-3 py-1.5 rounded-none text-xs font-bold text-cyber-cyan hover:text-white cursor-pointer"
              >
                <div className="w-6 h-6 rounded-none bg-cyber-cyan/15 border border-cyber-cyan flex items-center justify-center font-bold text-cyber-cyan text-[10px] glow-cyan">
                  {adminInitial}
                </div>
                <span className="hidden sm:inline">{adminName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-cyber-cyan" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-cyber-void border border-cyber-cyan/20 rounded-none p-2 w-48 shadow-2xl z-40 space-y-1 text-left">
                    <button
                      onClick={() => {
                        setActiveTab('settings');
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-cyber-cyan/10 text-xs rounded-none text-slate-300 hover:text-cyber-cyan font-bold cursor-pointer"
                    >
                      System Configs
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 hover:bg-cyber-pink/15 text-xs rounded-none text-cyber-pink font-bold flex items-center gap-2 cursor-pointer"
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
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 bg-cyber-void">
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
                <div className="space-y-6">
                  {/* Stats Summary */}
                  <StatCards reports={state.reports} officers={state.officers} />

                  {/* SOC Layout: 70% Main / 30% Sidebar */}
                  <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
                    {/* ===== MAIN CONTENT (70%) ===== */}
                    <div className="space-y-6">
                      {/* Live Crime Map */}
                      <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none p-4 relative hud-panel">
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <div>
                            <h3 className="text-sm font-bold tracking-wider text-cyber-cyan glow-cyan uppercase font-orbitron">LIVE_CRIME_GRID</h3>
                            <p className="text-slate-500 text-[10px] mt-0.5 uppercase tracking-wide">// Real-time incident geospatial overlay</p>
                          </div>
                          <button
                            onClick={() => setActiveTab('map')}
                            className="text-[10px] text-cyber-cyan hover:text-cyber-green font-bold uppercase tracking-wider cursor-pointer transition-colors"
                          >
                            Expand Map &rarr;
                          </button>
                        </div>
                        <AdminLiveMap reports={state.reports} officers={state.officers} />
                      </div>

                      {/* Crime Analytics Charts */}
                      <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none p-5 relative hud-panel">
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <div>
                            <h3 className="text-sm font-bold tracking-wider text-cyber-cyan glow-cyan uppercase font-orbitron">CRIME_ANALYTICS</h3>
                            <p className="text-slate-500 text-[10px] mt-0.5 uppercase tracking-wide">// Statistical intelligence overview</p>
                          </div>
                          <button
                            onClick={() => setActiveTab('analytics')}
                            className="text-[10px] text-cyber-cyan hover:text-cyber-green font-bold uppercase tracking-wider cursor-pointer transition-colors"
                          >
                            Full Analytics &rarr;
                          </button>
                        </div>
                        <div className="relative z-10">
                          <AnalyticsDashboard reports={state.reports} />
                        </div>
                      </div>

                      {/* Recent Activity Timeline */}
                      <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none p-5 relative hud-panel">
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <div>
                            <h3 className="text-sm font-bold tracking-wider text-cyber-cyan glow-cyan uppercase font-orbitron">RECENT_ACTIVITY</h3>
                            <p className="text-slate-500 text-[10px] mt-0.5 uppercase tracking-wide">// Latest system events and dispatches</p>
                          </div>
                          <button
                            onClick={() => setActiveTab('logs')}
                            className="text-[10px] text-cyber-cyan hover:text-cyber-green font-bold uppercase tracking-wider cursor-pointer transition-colors"
                          >
                            Full Feed &rarr;
                          </button>
                        </div>
                        <div className="relative z-10">
                          <SystemActivityFeed logs={state.logs} />
                        </div>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none p-5 relative hud-panel">
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <h3 className="text-sm font-bold tracking-wider text-cyber-cyan glow-cyan uppercase font-orbitron mb-4 relative z-10">DISPATCH_COMMANDS</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
                          {[
                            { label: 'Broadcast Alert', icon: Radio, onClick: () => setActiveTab('alerts'), color: 'text-cyber-pink border-cyber-pink/25 bg-cyber-pink/5 hover:border-cyber-pink/60 hover:bg-cyber-pink/15' },
                            { label: 'Verify Reports', icon: Shield, onClick: () => setActiveTab('reports'), color: 'text-cyber-cyan border-cyber-cyan/25 bg-cyber-cyan/5 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/15' },
                            { label: 'Assign Officer', icon: Plus, onClick: () => setActiveTab('officers'), color: 'text-cyber-green border-cyber-green/25 bg-cyber-green/5 hover:border-cyber-green/60 hover:bg-cyber-green/15' },
                            { label: 'Export Data', icon: Download, onClick: () => alert('Exporting all crime records as CSV...'), color: 'text-cyber-yellow border-cyber-yellow/25 bg-cyber-yellow/5 hover:border-cyber-yellow/60 hover:bg-cyber-yellow/15' },
                            { label: 'Open Reports', icon: FileText, onClick: () => navigate('/admin/reports'), color: 'text-cyber-cyan border-cyber-cyan/25 bg-cyber-cyan/5 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/15' },
                          ].map((act, idx) => {
                            const Icon = act.icon;
                            return (
                              <button
                                key={idx}
                                onClick={act.onClick}
                                className={`border p-3 rounded-none flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-250 font-bold uppercase text-[9px] h-20 cursor-pointer chamfer-button relative ${act.color}`}
                              >
                                <div className="hud-corner-tr" />
                                <div className="hud-corner-bl" />
                                <Icon className="w-4 h-4" />
                                <span>{act.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* ===== RIGHT SIDEBAR (30%) ===== */}
                    <div className="space-y-6">
                      {/* Active Alerts */}
                      <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none relative hud-panel">
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <EmergencyAlertCenter alerts={state.alerts} onBroadcast={state.broadcastAlert} />
                      </div>

                      {/* Officer Status */}
                      <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none p-5 relative hud-panel">
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <div className="relative z-10">
                          <OfficerStatusPanel officers={state.officers} />
                        </div>
                      </div>

                      {/* System Health */}
                      <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none p-5 relative hud-panel">
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <div className="relative z-10">
                          <SystemHealthPanel
                            onlineOfficers={state.officers.filter((o) => o.status === 'Online').length}
                            totalOfficers={state.officers.length}
                            activeAlerts={state.alerts.length}
                            totalReports={state.reports.length}
                          />
                        </div>
                      </div>

                      {/* Quick Notifications */}
                      <div className="bg-cyber-void/80 border border-cyber-cyan/15 rounded-none p-5 relative hud-panel">
                        <div className="hud-corner-tr" />
                        <div className="hud-corner-bl" />
                        <div className="relative z-10">
                          <h3 className="text-[10px] font-bold text-cyber-cyan glow-cyan tracking-widest font-tech uppercase mb-4">QUICK_NOTIFICATIONS</h3>
                          <div className="space-y-2">
                            {state.alerts.slice(0, 3).map((alert) => (
                              <div
                                key={alert.id}
                                className={`p-2.5 border text-left transition-all ${
                                  alert.severity === 'Critical' ? 'border-cyber-pink/30 bg-cyber-pink/5' :
                                  alert.severity === 'High' ? 'border-cyber-yellow/30 bg-cyber-yellow/5' :
                                  'border-cyber-cyan/20 bg-cyber-cyan/5'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-[9px] font-bold ${
                                    alert.severity === 'Critical' ? 'text-cyber-pink' :
                                    alert.severity === 'High' ? 'text-cyber-yellow' :
                                    'text-cyber-cyan'
                                  }`}>
                                    {alert.type}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-300 normal-case leading-normal">{alert.title}</p>
                                <span className="text-[8px] text-slate-500 mt-1 block">{alert.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100 font-orbitron">LIVE_CRIME_GRID</h2>
                    <p className="text-sm text-slate-400 mt-1">Real-time incident locations across all sectors</p>
                  </div>
                  <AdminLiveMap reports={state.reports} officers={state.officers} />
                </div>
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

              {activeTab === 'citizens' && (
                <CitizenManagement />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsDashboard reports={state.reports} />
              )}

              {activeTab === 'alerts' && (
                <div className="bg-cyber-void border border-cyber-cyan/20 rounded-none p-8">
                  <EmergencyAlertCenter alerts={state.alerts} onBroadcast={state.broadcastAlert} />
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="bg-cyber-void border border-cyber-cyan/20 rounded-none p-8">
                  <SystemActivityFeed logs={state.logs} />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto bg-cyber-void border border-cyber-cyan/20 rounded-none p-8 space-y-6 relative hud-panel">
                  {/* HUD Brackets Corners */}
                  <div className="hud-corner-tr" />
                  <div className="hud-corner-bl" />

                  <div className="font-tech uppercase">
                    <h3 className="text-sm font-bold text-cyber-cyan glow-cyan font-orbitron">SYSTEM_CONFIGS</h3>
                    <p className="text-slate-500 text-[10px] mt-0.5">// Configure operational bounds and alert thresholds.</p>
                  </div>

                  <form className="space-y-4 text-xs font-tech uppercase" onSubmit={(e) => { e.preventDefault(); alert('Configurations saved!'); }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider">SMS Alert Radius (km)</label>
                        <input type="number" defaultValue={5} className="w-full bg-cyber-void border border-cyber-cyan/20 rounded-none px-3 py-2 text-cyber-cyan focus:outline-none focus:border-cyber-cyan" />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-bold mb-1.5 uppercase tracking-wider">Max Dispatch Load/Officer</label>
                        <input type="number" defaultValue={4} className="w-full bg-cyber-void border border-cyber-cyan/20 rounded-none px-3 py-2 text-cyber-cyan focus:outline-none focus:border-cyber-cyan" />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-cyber-cyan/15">
                      <button type="submit" className="bg-cyber-cyan hover:bg-cyber-green px-5 py-2 text-cyber-void font-bold transition-all chamfer-button rounded-none border border-transparent cursor-pointer">
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
        <footer className="h-12 border-t border-cyber-cyan/15 bg-cyber-void px-6 lg:px-8 flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider font-tech">
          <span>CrimeWatch System v2.10</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyber-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors">Terms of Operations</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors">Support Center</a>
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
              className="fixed inset-0 bg-cyber-void/80 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="relative w-64 bg-cyber-void border-r border-cyber-cyan/15 flex flex-col z-10"
            >
              <div className="h-16 flex items-center px-6 border-b border-cyber-cyan/15 justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-cyber-cyan glow-cyan" />
                  <span className="font-bold text-sm text-slate-100 font-orbitron tracking-wider">CRIMEWATCH</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-cyber-cyan hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto font-tech uppercase text-xs tracking-wider">
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
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-none transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan glow-cyan chamfer-button'
                          : 'text-slate-400 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-cyber-cyan/15 font-tech uppercase text-xs tracking-wider">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-none text-cyber-pink border border-transparent hover:border-cyber-pink/35 hover:bg-cyber-pink/5 transition-all duration-200 cursor-pointer chamfer-button"
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
