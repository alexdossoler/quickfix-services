import CRMDashboard from '@/components/CRMDashboard';
import AuthWrapper from '@/components/AuthWrapper';

export default function CRMPage() {
  return (
    <AuthWrapper>
      <CRMDashboard />
    </AuthWrapper>
  );
}