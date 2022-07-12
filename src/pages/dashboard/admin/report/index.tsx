import { Financial_reports } from '@prisma/client';
import type { ChartData } from 'chart.js';
import {
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
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import fetchJson from '@/lib/fatchJson';

import AdminLayout from '@/components/layout/Admin.layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

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

const AdminReportIndex: NextPageWithLayoutAndAuth = () => {
  ChartJS.register(
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
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

  const reportQuery = useQuery('admin/report/all', () =>
    fetchJson<
      Financial_reports &
        {
          Ideas: {
            name: string;
            id: number;
          } | null;
        }[]
    >('/api/financial')
  );

  const reportTableData = useMemo(() => {
    if (reportQuery.data?.data) {
      return reportQuery.data?.data;
    }

    return [];
  }, [reportQuery.data?.data]);

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
        Header: 'Nama UMKM',
        accessor: 'Ideas.name',
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
        accessor: (row: { id: number; Ideas: { id: number } }) => ({
          report_id: row.id,
          idea_id: row.Ideas.id,
        }),
        Cell: ({
          value,
        }: {
          value: { report_id: number; idea_id: number };
        }) => (
          <div>
            <ButtonLink
              variant='outline'
              href={`/dashboard/admin/idea/${value.idea_id}/report/${value.report_id}`}
            >
              Detail
            </ButtonLink>
          </div>
        ),
      },
    ],
    []
  );

  const profitChartData = useMemo<ChartData<'line'>>(() => {
    if (profitQuery.data?.data) {
      const labels: string[] = [];
      const dataset: { profit: number[]; loss: number[] } = {
        profit: [],
        loss: [],
      };

      profitQuery.data?.data.forEach((d) => {
        labels.push(d?.month);
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

  return (
    <>
      <Seo templateTitle='Admin Laporan Keuangan' />
      <div className='flex w-full flex-col gap-x-10 gap-y-10'>
        <div className='mx-auto w-11/12 text-center'>
          <span className='text-cente mb-4 inline-block'>Pendapatan UMKM</span>
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

AdminReportIndex.Auth = { role: 'admin' };
AdminReportIndex.Layout = AdminLayout;

export default AdminReportIndex;
