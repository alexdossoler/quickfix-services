import CRMTestDashboard from '@/components/CRMTestDashboard';
import AuthWrapper from '@/components/AuthWrapper';

export default function AdminPage() {
  return (
    <AuthWrapper>
      <CRMTestDashboard />
    </AuthWrapper>
  );
}
