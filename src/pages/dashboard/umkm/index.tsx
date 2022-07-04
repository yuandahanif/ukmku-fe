import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

const UMKMDashboardIndex: NextPageWithLayoutAndAuth = () => {
  return <div>this is sample page</div>;
};

UMKMDashboardIndex.Auth = { role: 'UMKM' };

export default UMKMDashboardIndex;
