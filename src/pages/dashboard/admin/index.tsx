import type { ChartData } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import AdminLayout from '@/components/layout/Admin.layout';
import Seo from '@/components/Seo';

const AdminDashboardIndex: NextPageWithLayoutAndAuth = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data: ChartData<'pie'> = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Seo templateTitle='Admin Beranda' />
      <div className='flex gap-x-10'>
        <div className='w-full max-w-md bg-red-200'>
          <Pie data={data} />
        </div>
        <div className='w-full bg-red-200'>
          <Pie data={data} />
        </div>
      </div>
    </>
  );
};

AdminDashboardIndex.Auth = { role: 'Admin' };
AdminDashboardIndex.Layout = AdminLayout;

export default AdminDashboardIndex;
