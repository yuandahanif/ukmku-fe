import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

const Sample: NextPageWithLayoutAndAuth = () => {
  return <div>this is sample page</div>;
};

Sample.Auth = { role: 'admin' };

export default Sample;
