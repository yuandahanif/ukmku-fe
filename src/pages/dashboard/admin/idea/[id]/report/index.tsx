import { Financial_reports } from '@prisma/client';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import fetchJson from '@/lib/fatchJson';

import AdminLayout from '@/components/layout/Admin.layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

const AdminIdeaReportIndex: NextPageWithLayoutAndAuth = () => {
  const router = useRouter();
  const id = Number(router.query.id);

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
        text: 'Pendapatan UMKM',
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

  ChartJS.register(
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );

  const profitQuery = useQuery('admin/idea/id/financial', () =>
    fetchJson<Financial_reports[]>(`/api/idea/${id}/financial`)
  );

  const profitChartData = useMemo<ChartData<'line'>>(() => {
    if (profitQuery.data?.data) {
      const labels: string[] = [];
      const dataset: { profit: number[]; loss: number[] } = {
        profit: [],
        loss: [],
      };

      profitQuery.data?.data?.forEach((d) => {
        labels.push(d.month || 'NaN');
        dataset.loss.push(d.fund);
        dataset.profit.push(d.profit);
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

  const reportTableData = useMemo(() => {
    if (profitQuery.data?.data) {
      return profitQuery.data?.data.reverse();
    }

    return [];
  }, [profitQuery.data?.data]);

  const reportTableColumn = useMemo(
    () => [
      {
        Header: 'No',
        id: 'no',
        accessor: (_: unknown, index: number) => index + 1,
        Cell: ({ value }: { value: string | number }) => (
          <span className='inline-block w-10 text-center'>{value}</span>
        ),
      },
      {
        Header: 'Tahun',
        accessor: 'year',
      },
      {
        Header: 'Bulan',
        accessor: 'month',
      },
      {
        Header: 'Pendapatan',
        accessor: 'profit',
        Cell: ({ value }: { value: string | number }) => (
          <span className='inline-block w-40 text-center'>{value}</span>
        ),
      },
      {
        Header: 'Pengeluaran',
        accessor: 'fund',
        Cell: ({ value }: { value: string | number }) => (
          <span className='inline-block w-40 text-center'>{value}</span>
        ),
      },
      {
        Header: 'Laba',
        accessor: (row: Financial_reports) => ({
          laba: row.profit - row.fund,
          isProfit: row.fund < row.profit,
        }),
        Cell: ({ value }: { value: { laba: number; isProfit: boolean } }) => (
          <span
            className={`inline-block w-40 text-center ${
              value.isProfit ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {value.laba}
          </span>
        ),
      },
      {
        Header: 'Aksi',
        accessor: 'id',
        Cell: ({ value }: { value: string | number }) => (
          <div>
            <ButtonLink
              variant='outline'
              href={`/dashboard/admin/idea/${id}/report/${value}`}
            >
              Detail
            </ButtonLink>
          </div>
        ),
      },
    ],
    [id]
  );

  return (
    <>
      <Seo templateTitle='Admin laporan Keuangan' />
      <div className=''>
        <h2 className='mb-1 text-xl'>Laporan Keuangan</h2>
        <span className='mb-3 inline-block'>
          Laporan terakhir pada: {profitQuery.data?.data[0].month}{' '}
          {profitQuery.data?.data[0].year}
        </span>

        <div className='mx-auto mb-8 w-10/12'>
          {profitQuery.isSuccess && (
            <Line options={lineChartOptions} data={profitChartData} />
          )}
        </div>

        <div className='mx-auto'>
          <Table
            columns={reportTableColumn as never}
            data={reportTableData as never}
          />
        </div>
      </div>
    </>
  );
};

AdminIdeaReportIndex.Auth = { role: 'admin' };
AdminIdeaReportIndex.Layout = AdminLayout;

export default AdminIdeaReportIndex;
