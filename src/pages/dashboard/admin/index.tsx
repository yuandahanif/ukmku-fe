import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import AdminLayout from '@/components/layout/Admin.layout';
import Seo from '@/components/Seo';

const AdminDashboardIndex: NextPageWithLayoutAndAuth = () => {
  return (
    <>
      <Seo templateTitle='Admin Beranda' />
      <div>this is sample page</div>
    </>
  );
};

AdminDashboardIndex.Auth = { role: 'Admin' };
AdminDashboardIndex.Layout = AdminLayout;

export default AdminDashboardIndex;
