import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import AdminLayout from '@/components/layout/Admin.layout';
import Seo from '@/components/Seo';

const AdminIdeaIndex: NextPageWithLayoutAndAuth = () => {
  return (
    <>
      <Seo templateTitle='Admin Ide Bisnis' />
      <div>this is idea page</div>
    </>
  );
};

AdminIdeaIndex.Auth = { role: 'Admin' };
AdminIdeaIndex.Layout = AdminLayout;

export default AdminIdeaIndex;
