import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Clock, Map } from 'lucide-react';
import type { CrimeReport } from '../hooks/useAdminState';

interface AnalyticsDashboardProps {
  reports: CrimeReport[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ reports }) => {
  // Category counting math
  const categoryCounts = reports.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.keys(categoryCounts).map((key) => ({
    name: key.length > 14 ? key.substring(0, 12) + '..' : key,
    value: categoryCounts[key],
  }));

  // Mock trends over the year
  const trendData = [
    { month: 'Jan', incidents: 65, resolved: 52 },
    { month: 'Feb', incidents: 58, resolved: 48 },
    { month: 'Mar', incidents: 72, resolved: 60 },
    { month: 'Apr', incidents: 80, resolved: 64 },
    { month: 'May', incidents: 92, resolved: 76 },
    { month: 'Jun', incidents: 85, resolved: 70 },
    { month: 'Jul', incidents: reports.length + 65, resolved: reports.filter(r => r.status === 'Resolved').length + 55 },
  ];

  // Mock hourly crime density
  const hourlyData = [
    { hour: '00:00', value: 12 },
    { hour: '04:00', value: 4 },
    { hour: '08:00', value: 8 },
    { hour: '12:00', value: 18 },
    { hour: '16:00', value: 24 },
    { hour: '20:00', value: 38 },
  ];

  // Sector-based crime count
  const sectorData = [
    { sector: 'Central Sector', value: reports.filter(r => r.location.includes('Way') || r.location.includes('Alley')).length + 2 },
    { sector: 'North Sector', value: 4 },
    { sector: 'South Sector', value: reports.filter(r => r.location.includes('Ridge') || r.location.includes('Bench')).length + 1 },
    { sector: 'East Sector', value: 2 },
    { sector: 'West Sector', value: 3 },
  ];

  const PIE_COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#ec4899', '#10b981'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-100">Crime Intelligence Analytics</h3>
        <p className="text-slate-500 text-xs mt-0.5">Statistical insights and neighborhood safety metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Area Chart */}
        <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Monthly Crime & Resolution Trends</span>
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="incidents" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorIncidents)" name="Total Incidents" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" name="Resolved Cases" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Incidents by Crime Category</span>
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} interval={0} />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} name="Reports count">
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Line Chart */}
        <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Peak Incident Activity Hours</span>
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2.5} activeDot={{ r: 6 }} name="Incident Frequency" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Pie Chart */}
        <div className="bg-slate-950/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-400" />
            <span>Geographical Sector Distribution</span>
          </h4>
          <div className="h-64 flex items-center justify-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '8px' }} />
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sectorData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Pie custom legends */}
            <div className="w-1/2 space-y-2 text-xs">
              {sectorData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                  <span className="text-slate-400">{entry.sector}:</span>
                  <span className="font-bold text-slate-200">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsDashboard;
