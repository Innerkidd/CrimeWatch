import { useState, useCallback } from 'react';

export interface CrimeReport {
  id: string;
  type: string;
  reporter: string;
  location: string;
  dateTime: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Pending Verification' | 'Verified' | 'Active Investigation' | 'Resolved' | 'Rejected';
  assignedOfficer: string | null;
  description: string;
  coordinates: { x: number; y: number }; // Percentage offsets for custom map positioning
}

export interface Officer {
  id: string;
  name: string;
  badgeId: string;
  rank: string;
  status: 'Online' | 'Offline';
  assignedCases: number;
  contact: string;
  availability: 'Available' | 'On Duty' | 'On Leave';
}

export interface Investigation {
  id: string;
  caseId: string;
  title: string;
  assignedOfficer: string;
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
}

export interface EmergencyAlert {
  id: string;
  type: 'Active Threat' | 'Missing Person' | 'High-Priority Alert' | 'Broadcasting Alert';
  title: string;
  severity: 'Critical' | 'High' | 'Medium';
  time: string;
}

export interface SystemLog {
  id: string;
  type: 'submission' | 'assignment' | 'verification' | 'alert' | 'system';
  message: string;
  time: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}

export const useAdminState = () => {
  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const triggerToast = useCallback((message: string, type: ToastMessage['type']) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // System Logs
  const [logs, setLogs] = useState<SystemLog[]>([
    { id: '1', type: 'submission', message: 'New Incident report INC-88392 submitted by Anonymous.', time: '12 mins ago' },
    { id: '2', type: 'verification', message: 'Report INC-88390 verified by Administrator.', time: '1 hour ago' },
    { id: '3', type: 'assignment', message: 'Case INV-502 assigned to Officer Sarah Connor.', time: '2 hours ago' },
    { id: '4', type: 'alert', message: 'Amber Alert broadcasted for Marcus Miller (8yo).', time: '3 hours ago' },
    { id: '5', type: 'system', message: 'Websocket server connection established successfully.', time: '4 hours ago' },
  ]);

  const addLog = useCallback((type: SystemLog['type'], message: string) => {
    const newLog: SystemLog = {
      id: Math.random().toString(36).substring(7),
      type,
      message,
      time: 'Just now',
    };
    setLogs((prev) => [newLog, ...prev]);
  }, []);

  // Emergency Alerts
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    { id: '1', type: 'Active Threat', title: 'Armed Robbery reported near 5th Ave and Pine St.', severity: 'Critical', time: '5 mins ago' },
    { id: '2', type: 'Missing Person', title: 'Marcus Miller (8yo), last seen in Central Park East.', severity: 'High', time: '40 mins ago' },
    { id: '3', type: 'High-Priority Alert', title: 'Sudden gas leak alert on Broadway Commercial Center.', severity: 'High', time: '2 hours ago' },
  ]);

  const broadcastAlert = useCallback((type: EmergencyAlert['type'], title: string, severity: EmergencyAlert['severity']) => {
    const newAlert: EmergencyAlert = {
      id: Math.random().toString(36).substring(7),
      type,
      title,
      severity,
      time: 'Just now',
    };
    setAlerts((prev) => [newAlert, ...prev]);
    addLog('alert', `Emergency Alert [${type}]: "${title}" was broadcasted.`);
    triggerToast(`Emergency Broadcast Sent: ${title}`, 'danger');
  }, [addLog, triggerToast]);

  // Officers List
  const [officers, setOfficers] = useState<Officer[]>([
    { id: 'OFF-101', name: 'Officer Sarah Connor', badgeId: 'BADGE-8839', rank: 'Sergeant', status: 'Online', assignedCases: 2, contact: '+1 (555) 911-3829', availability: 'On Duty' },
    { id: 'OFF-102', name: 'Officer Alex Mercer', badgeId: 'BADGE-4428', rank: 'Patrol Officer', status: 'Online', assignedCases: 1, contact: '+1 (555) 911-8831', availability: 'Available' },
    { id: 'OFF-103', name: 'Officer Carter Harrison', badgeId: 'BADGE-9912', rank: 'Detective', status: 'Online', assignedCases: 3, contact: '+1 (555) 911-0982', availability: 'On Duty' },
    { id: 'OFF-104', name: 'Officer Marcus Vance', badgeId: 'BADGE-1234', rank: 'Patrol Officer', status: 'Offline', assignedCases: 0, contact: '+1 (555) 911-7643', availability: 'On Leave' },
    { id: 'OFF-105', name: 'Officer Elena Rostova', badgeId: 'BADGE-5541', rank: 'Lieutenant', status: 'Online', assignedCases: 1, contact: '+1 (555) 911-5510', availability: 'Available' },
  ]);

  const addOfficer = useCallback((name: string, badgeId: string, rank: string, contact: string) => {
    const newOfficer: Officer = {
      id: `OFF-${Math.floor(100 + Math.random() * 900)}`,
      name,
      badgeId,
      rank,
      status: 'Online',
      assignedCases: 0,
      contact,
      availability: 'Available',
    };
    setOfficers((prev) => [...prev, newOfficer]);
    addLog('system', `New Officer ${name} (Badge: ${badgeId}) registered in system.`);
    triggerToast(`Officer ${name} added successfully`, 'success');
  }, [addLog, triggerToast]);

  // Crime Reports List
  const [reports, setReports] = useState<CrimeReport[]>([
    {
      id: 'INC-88392',
      type: 'Suspicious Activity',
      reporter: 'Anonymous',
      location: '42 Wallaby Way, Sydney',
      dateTime: '2026-07-11 11:15 AM',
      severity: 'Low',
      status: 'Pending Verification',
      assignedOfficer: null,
      description: 'A black sedan was spotted driving slowly around the neighborhood multiple times. The driver was seen taking pictures of residences.',
      coordinates: { x: 35, y: 25 },
    },
    {
      id: 'INC-88390',
      type: 'Theft / Burglary',
      reporter: 'Marcus Aurelius',
      location: 'Commercial Alley, Block C',
      dateTime: '2026-07-11 09:30 AM',
      severity: 'High',
      status: 'Verified',
      assignedOfficer: 'Officer Sarah Connor',
      description: 'Shop owner reports glass broken and jewelry stolen from showcase window. Value estimated at $5,000.',
      coordinates: { x: 65, y: 30 },
    },
    {
      id: 'INC-88389',
      type: 'Vandalism',
      reporter: 'Anonymous',
      location: 'Oak Street Park Bench',
      dateTime: '2026-07-11 08:00 AM',
      severity: 'Medium',
      status: 'Active Investigation',
      assignedOfficer: 'Officer Carter Harrison',
      description: 'Vandals spray-painted offensive symbols on public benches and the central fountain.',
      coordinates: { x: 45, y: 70 },
    },
    {
      id: 'INC-88388',
      type: 'Assault',
      reporter: 'Jane Doe',
      location: 'Subway Station Exit 2',
      dateTime: '2026-07-11 02:15 AM',
      severity: 'High',
      status: 'Pending Verification',
      assignedOfficer: null,
      description: 'Physical altercation reported between two individuals outside the turnstiles. One sustained minor facial cuts.',
      coordinates: { x: 20, y: 60 },
    },
    {
      id: 'INC-88387',
      type: 'Noise Complaint',
      reporter: 'Franklin Pierce',
      location: 'Pine Ridge Apartments 4B',
      dateTime: '2026-07-10 11:45 PM',
      severity: 'Low',
      status: 'Resolved',
      assignedOfficer: 'Officer Alex Mercer',
      description: 'Loud music and shouting from a house party continuing past midnight. Resolved after patrol officer warning.',
      coordinates: { x: 75, y: 75 },
    },
    {
      id: 'INC-88386',
      type: 'Harassment',
      reporter: 'Clara Oswald',
      location: 'High Street Bus Stop',
      dateTime: '2026-07-10 04:30 PM',
      severity: 'Medium',
      status: 'Rejected',
      assignedOfficer: null,
      description: 'Verbal dispute between commuter and bus driver over fare collection. Deemed non-criminal dispute.',
      coordinates: { x: 50, y: 40 },
    },
  ]);

  // Investigations List
  const [investigations, setInvestigations] = useState<Investigation[]>([
    { id: 'INV-501', caseId: 'INC-88390', title: 'Jewelry Store Burglary', assignedOfficer: 'Officer Sarah Connor', progress: 45, priority: 'High', deadline: '2026-07-15' },
    { id: 'INV-502', caseId: 'INC-88389', title: 'Park Fountain Vandalism', assignedOfficer: 'Officer Carter Harrison', progress: 20, priority: 'Medium', deadline: '2026-07-20' },
  ]);

  // Verify Report
  const verifyReport = useCallback((id: string) => {
    setReports((prev) =>
      prev.map((rep) => (rep.id === id ? { ...rep, status: 'Verified' } : rep))
    );
    addLog('verification', `Incident report ${id} has been verified.`);
    triggerToast(`Report ${id} verified`, 'success');
  }, [addLog, triggerToast]);

  // Reject Report
  const rejectReport = useCallback((id: string) => {
    setReports((prev) =>
      prev.map((rep) => (rep.id === id ? { ...rep, status: 'Rejected' } : rep))
    );
    addLog('verification', `Incident report ${id} has been rejected.`);
    triggerToast(`Report ${id} rejected`, 'warning');
  }, [addLog, triggerToast]);

  // Assign Officer
  const assignOfficer = useCallback((reportId: string, officerName: string) => {
    setOfficers((prev) =>
      prev.map((off) => {
        if (off.name === officerName) {
          return { ...off, assignedCases: off.assignedCases + 1, availability: 'On Duty' };
        }
        return off;
      })
    );

    setReports((prev) =>
      prev.map((rep) =>
        rep.id === reportId
          ? { ...rep, status: 'Active Investigation', assignedOfficer: officerName }
          : rep
      )
    );

    const report = reports.find((r) => r.id === reportId);
    if (report) {
      const newInvestigation: Investigation = {
        id: `INV-${Math.floor(500 + Math.random() * 500)}`,
        caseId: reportId,
        title: `${report.type} Investigation`,
        assignedOfficer: officerName,
        progress: 10,
        priority: report.severity,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      };
      setInvestigations((prev) => [...prev, newInvestigation]);
    }

    addLog('assignment', `Officer ${officerName} assigned to incident ${reportId}.`);
    triggerToast(`Officer ${officerName} assigned to case`, 'info');
  }, [reports, addLog, triggerToast]);

  // Update Case Progress
  const updateProgress = useCallback((caseId: string, progress: number) => {
    setInvestigations((prev) =>
      prev.map((inv) => {
        if (inv.id === caseId) {
          const updatedProgress = Math.min(Math.max(progress, 0), 100);
          
          // If progress reaches 100%, mark report as resolved
          if (updatedProgress === 100) {
            setReports((rPrev) =>
              rPrev.map((r) => (r.id === inv.caseId ? { ...r, status: 'Resolved' } : r))
            );
            addLog('system', `Investigation ${inv.id} resolved. Case closed.`);
            triggerToast(`Case ${inv.id} fully resolved & closed!`, 'success');
          } else {
            addLog('system', `Investigation ${inv.id} progress updated to ${updatedProgress}%.`);
            triggerToast(`Case progress updated to ${updatedProgress}%`, 'success');
          }
          return { ...inv, progress: updatedProgress };
        }
        return inv;
      })
    );
  }, [addLog, triggerToast]);

  // Close Case
  const closeCase = useCallback((caseId: string) => {
    updateProgress(caseId, 100);
  }, [updateProgress]);

  // Remove Toast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    logs,
    alerts,
    officers,
    reports,
    investigations,
    verifyReport,
    rejectReport,
    assignOfficer,
    updateProgress,
    closeCase,
    broadcastAlert,
    addOfficer,
    removeToast,
    triggerToast,
  };
};

import { createContext, useContext } from 'react';

export type AdminStateContextType = ReturnType<typeof useAdminState>;

export const AdminStateContext = createContext<AdminStateContextType | null>(null);

export const useAdminContext = () => {
  const context = useContext(AdminStateContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminStateProvider');
  }
  return context;
};

