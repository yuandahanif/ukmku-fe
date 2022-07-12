import type { ChartData } from 'chart.js';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useMemo } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import fetchJson from '@/lib/fatchJson';

import AdminLayout from '@/components/layout/Admin.layout';
import Seo from '@/components/Seo';

const lineChartOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Pendapatan UMKM tahun lalu',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Ide bisnis',
    },
  },
};

const AdminDashboardIndex: NextPageWithLayoutAndAuth = () => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement
  );

  const categoryQuery = useQuery('admin/category/statistic', () =>
    fetchJson<
      {
        id: number;
        name: string;
        clasification: string;
        createdAt: string;
        updatedAt: string;
        _count: {
          Ideas: number;
        };
      }[]
    >('/api/statistics/category')
  );
  const profitQuery = useQuery('admin/profit/statistic', () =>
    fetchJson<
      {
        id: number;
        year: number;
        month: string;
        _sum: {
          profit: number;
          fund: number;
        };
      }[]
    >('/api/statistics/profit')
  );

  const ideaStatusQuery = useQuery('admin/idea_status/statistic', () =>
    fetchJson<
      {
        status: string;
        _count: {
          id: number;
        };
      }[]
    >('/api/statistics/idea_status')
  );

  const categoryChartData = useMemo<ChartData<'pie'>>(() => {
    if (categoryQuery.data?.data) {
      const labels: string[] = [];
      const data: number[] = [];

      categoryQuery.data?.data.forEach((d) => {
        labels.push(d.name);
        data.push(d._count.Ideas);
      });

      return {
        labels: labels,
        datasets: [
          {
            label: 'Banyaknya UMKM per kategori',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      };
    }

    return {
      labels: ['fetching data'],
      datasets: [
        {
          label: 'Banyaknya UMKM per kategori',
          data: [0],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderWidth: 1,
        },
      ],
    };
  }, [categoryQuery.data?.data]);

  const profitChartData = useMemo<ChartData<'line'>>(() => {
    if (profitQuery.data?.data) {
      const labels: string[] = [];
      const dataset: { profit: number[]; loss: number[] } = {
        profit: [],
        loss: [],
      };

      profitQuery.data?.data.forEach((d) => {
        labels.push(d.month);
        dataset.loss.push(d._sum.fund);
        dataset.profit.push(d._sum.profit);
      });

      return {
        labels,
        datasets: [
          {
            label: 'Pendapatan',
            data: dataset.profit,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y',
          },
          {
            label: 'Pengeluaran',
            data: dataset.loss,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y1',
          },
        ],
      };
    }

    return {
      labels: ['fetching data'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [0],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Dataset 2',
          data: [0],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y1',
        },
      ],
    };
  }, [profitQuery.data?.data]);

  const ideaStatusChartData = useMemo<ChartData<'bar'>>(() => {
    if (ideaStatusQuery.data?.data) {
      const labels: string[] = [];
      const data: number[] = [];

      ideaStatusQuery.data?.data.forEach((d) => {
        labels.push(d.status);
        data.push(d._count.id);
      });

      return {
        labels,
        datasets: [
          {
            label: 'Status ide bisnis UMKM',
            data: data,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    }

    return {
      labels: ['fetching data'],
      datasets: [
        {
          data: [0],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }, [ideaStatusQuery.data?.data]);

  return (
    <>
      <Seo templateTitle='Admin Beranda' />
      <div className='flex w-full flex-col gap-x-10 gap-y-10'>
        <div className='flex'>
          <div className='w-full max-w-md text-center'>
            <span className='text-cente mb-4 inline-block'>
              Banyaknya UMKM per kategori
            </span>
            {categoryQuery.isSuccess && (
              <Pie
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: 'Banyaknya UMKM per kategori',
                    },
                  },
                }}
                data={categoryChartData}
              />
            )}
          </div>
          <div className='w-full text-center'>
            <span className='text-cente mb-4 inline-block'>Ide bisnis</span>
            {ideaStatusQuery.isSuccess && (
              <Bar options={barChartOptions} data={ideaStatusChartData} />
            )}
          </div>
        </div>

        <div className='mx-auto w-11/12 text-center'>
          <span className='text-cente mb-4 inline-block'>Pendapatan UMKM</span>
          {profitQuery.isSuccess && (
            <Line options={lineChartOptions} data={profitChartData} />
          )}
        </div>
      </div>
    </>
  );
};

AdminDashboardIndex.Auth = { role: 'admin' };
AdminDashboardIndex.Layout = AdminLayout;

export default AdminDashboardIndex;
