import { useParams } from 'react-router-dom';
import { CrimeHeader } from '../components/CrimeHeader';
import { IncidentDetails } from '../components/IncidentDetails';
import { CrimeMap } from '../components/CrimeMap';
import { EvidenceGallery } from '../components/EvidenceGallery';
import { InvestigationTimeline } from '../components/InvestigationTimeline';
import { PoliceUpdates } from '../components/PoliceUpdates';
import { SimilarIncidents } from '../components/SimilarIncidents';
import { EmergencyContacts } from '../components/EmergencyContacts';
import { ActionBar } from '../components/ActionBar';
import { mockCrimeDetail } from '../data/mockData';

export const CrimeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  // In production, fetch by id. Using mock data for now.
  const crime = { ...mockCrimeDetail, id: id || mockCrimeDetail.id };

  return (
    <div className="space-y-6">
      <CrimeHeader crime={crime} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <IncidentDetails crime={crime} />
          <CrimeMap crime={crime} />
          <EvidenceGallery evidence={crime.evidence} />
          <InvestigationTimeline timeline={crime.timeline} />
          <PoliceUpdates updates={crime.policeUpdates} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ActionBar />
          <SimilarIncidents incidents={crime.similarIncidents} />
          <EmergencyContacts />
        </div>
      </div>
    </div>
  );
};

export default CrimeDetailsPage;
