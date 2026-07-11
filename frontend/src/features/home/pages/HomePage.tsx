import { Navbar } from '@/features/home/components/Navbar';
import { HeroSection } from '@/features/home/components/HeroSection';
import { LiveStats } from '@/features/home/components/LiveStats';
import { FeaturesSection } from '@/features/home/components/FeaturesSection';
import { MapPreview } from '@/features/home/components/MapPreview';
import { HowItWorks } from '@/features/home/components/HowItWorks';
import { RecentReports } from '@/features/home/components/RecentReports';
import { SafetyTips } from '@/features/home/components/SafetyTips';
import { CTASection } from '@/features/home/components/CTASection';
import { useEffect } from 'react';
import { Footer } from '@/features/home/components/Footer';
import PixelBlast from '@/shared/components/effects/PixelBlast';

export const HomePage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, []);
  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden">
      {/* Full-page PixelBlast background */}
      <div className="fixed inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#1e3a5f"
          patternScale={2.5}
          patternDensity={1.1}
          pixelSizeJitter={0.4}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={true}
          liquidStrength={0.08}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.4}
          edgeFade={0.3}
          transparent={true}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 z-[1] bg-navy-950/70 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <LiveStats />
          <FeaturesSection />
          <MapPreview />
          <HowItWorks />
          <RecentReports />
          <SafetyTips />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
