import { WelcomeSection } from '../components/WelcomeSection';
import { QuickActions } from '../components/QuickActions';
import { StatsSection } from '../components/StatsSection';
import { NearbyAlerts } from '../components/NearbyAlerts';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { SafetyTips } from '../components/SafetyTips';
import { MiniMap } from '../components/MiniMap';
import { DashboardFooter } from '../components/DashboardFooter';

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <QuickActions />
      <StatsSection />

      {/* Main Grid: Alerts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NearbyAlerts />
        <ActivityTimeline />
      </div>

      {/* Bottom Grid: Tips + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SafetyTips />
        <MiniMap />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default DashboardPage;
