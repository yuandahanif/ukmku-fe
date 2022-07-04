import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

const DashboardIndex: NextPageWithLayoutAndAuth = () => {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      switch (data.user.role) {
        case 'Admin':
          router.replace('/dashboard/admin');
          break;
        case 'UMKM':
          router.replace('/dashboard/umkm');
          break;
      }
    }
  }, [data, router]);
  return <div>Redirecting to dashboard page.</div>;
};

DashboardIndex.Auth = {};

export default DashboardIndex;
