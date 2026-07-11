class DashboardModel {
  static Overview = {
    totalUsers: 0,
    totalPolice: 0,
    totalReports: 0,
    pendingReports: 0,
    activeInvestigations: 0,
    resolvedReports: 0,
    reportsToday: 0,
    reportsThisMonth: 0,
  };

  static CrimeStats = {
    byCategory: [],
    byCity: [],
    byStatus: [],
    bySeverity: [],
  };

  static ChartData = {
    monthlyTrend: [],
    dailyTrend: [],
    weeklyTrend: [],
    categoryDistribution: [],
    statusDistribution: [],
  };

  static RecentActivity = {
    latestReports: [],
    latestInvestigations: [],
    latestNotifications: [],
  };

  static HeatmapAnalytics = {
    topCrimeAreas: [],
    highRiskZones: [],
    crimeDensity: [],
  };

  static PoliceAnalytics = {
    casesAssigned: 0,
    casesSolved: 0,
    casesPending: 0,
    averageResolutionHours: 0,
  };

  static SystemAnalytics = {
    activeUsers: 0,
    onlinePolice: 0,
    totalNotificationsSent: 0,
    averageResponseHours: 0,
  };
}

module.exports = DashboardModel;
