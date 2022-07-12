import {
  Categories,
  Files,
  Financial_reports,
  Fund_transactions,
  Ideas,
  Reject_fund_reasons,
  Users,
} from '@prisma/client';
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
import { ChartData } from 'chart.js';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import fetchJson from '@/lib/fatchJson';

import AdminLayout from '@/components/layout/Admin.layout';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

type ApiResponse = Ideas & {
  Categories: Categories | null;
  Files: Files[];
  Fund_transactions: Fund_transactions[];
  Reject_fund_reasons: Reject_fund_reasons[];
  Users: Users | null;
};

const PandingIdeaSection: React.FC<{ idea: ApiResponse }> = ({ idea }) => (
  <div className=' flex flex-col gap-y-4 text-slate-700'>
    <h1 className='text-3xl'>{idea?.name}</h1>

    <div className='flex flex-wrap justify-end gap-x-4 text-slate-700'>
      <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
          />
        </svg>
        <div className='flex flex-col'>
          <span className='text-xs'>Kategori :</span>
          <span>{idea.Categories?.name}</span>
        </div>
      </div>

      <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
        <div className='flex flex-col'>
          <span className='text-xs'>Lokasi :</span>
          <span>{idea.location}</span>
        </div>
      </div>
    </div>

    <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
      <div className='flex flex-col gap-y-3'>
        <span className='text-xs'>Deskripsi :</span>
        <p className=''>{idea.description}</p>
      </div>
    </div>

    <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
      <div className='flex flex-col gap-y-1'>
        <span className='text-xs'>Lampiran :</span>
        <div className='flex flex-wrap gap-2 '>
          {idea?.Files.map((f, i) => (
            <div
              className='rounded-md border-2 border-slate-500 p-2'
              key={f.id}
            >
              <UnderlineLink href={f.url}>lampiran {i}</UnderlineLink>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className='flex flex-wrap justify-end gap-x-4 text-slate-700'>
      <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
        <div className='flex flex-col'>
          <span className='text-xs'>Permintaan Dana :</span>
          <span>Rp. {idea.required_fund}</span>
        </div>
      </div>

      <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
        <div className='flex flex-col'>
          <span className='text-xs'>Pembuat :</span>
          <span>{idea.Users?.name}</span>
        </div>
      </div>

      <div className='ml-auto flex min-w-[300px] gap-x-4 p-2'>
        <button className='w-full rounded-md bg-red-400 text-white' disabled>
          Tolak
        </button>
        <button className='w-full rounded-md bg-green-400 text-white' disabled>
          Terima
        </button>
      </div>
    </div>
  </div>
);

const FundedIdeaSection: React.FC<{ idea: ApiResponse }> = ({ idea }) => {
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
    fetchJson<Financial_reports[]>(`/api/idea/${idea.id}/financial`)
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

  return (
    <div className=' flex flex-col gap-y-4 text-slate-700'>
      <h1 className='text-3xl'>{idea?.name}</h1>

      <div className='flex justify-end gap-x-4 text-slate-700'>
        <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
          </svg>
          <div className='flex flex-col'>
            <span className='text-xs'>Pembuat :</span>
            <span>{idea.Users?.name}</span>
          </div>
        </div>

        <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
            />
          </svg>
          <div className='flex flex-col'>
            <span className='text-xs'>Kategori :</span>
            <span>{idea.Categories?.name}</span>
          </div>
        </div>

        <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <div className='flex flex-col'>
            <span className='text-xs'>Lokasi :</span>
            <span>{idea.location}</span>
          </div>
        </div>
      </div>

      <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <div className='flex flex-col gap-y-3'>
          <span className='text-xs'>Deskripsi :</span>
          <p className=''>{idea.description}</p>
        </div>
      </div>

      <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <div className='flex flex-col gap-y-1'>
          <span className='text-xs'>Lampiran :</span>
          <div className='flex flex-wrap gap-2 '>
            {idea?.Files.map((f, i) => (
              <div
                className='rounded-md border-2 border-slate-500 p-2'
                key={f.id}
              >
                <UnderlineLink href={f.url}>lampiran {i}</UnderlineLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mx-auto w-11/12 text-center'>
        <span className='text-cente mb-4 inline-block'>Pendapatan UMKM</span>
        {profitQuery.isSuccess && (
          <Line options={lineChartOptions} data={profitChartData} />
        )}

        <ArrowLink
          as={UnstyledLink}
          className='mt-8 inline-flex items-center'
          href={`/dashboard/admin/idea/${idea.id}/report`}
        >
          Detail Laporan Keuntungan
        </ArrowLink>
      </div>
    </div>
  );
};

const CanceledIdeaSection: React.FC<{ idea: ApiResponse }> = ({ idea }) => (
  <div className=' flex flex-col gap-y-4 text-slate-700'>
    <h1 className='text-3xl'>{idea?.name}</h1>

    <div className='flex flex-wrap justify-end gap-x-4 text-slate-700'>
      <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
          />
        </svg>
        <div className='flex flex-col'>
          <span className='text-xs'>Kategori :</span>
          <span>{idea.Categories?.name}</span>
        </div>
      </div>

      <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
        <div className='flex flex-col'>
          <span className='text-xs'>Lokasi :</span>
          <span>{idea.location}</span>
        </div>
      </div>
    </div>

    <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
      <div className='flex flex-col gap-y-3'>
        <span className='text-xs'>Deskripsi :</span>
        <p className=''>{idea.description}</p>
      </div>
    </div>

    <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
      <div className='flex flex-col gap-y-1'>
        <span className='text-xs'>Lampiran :</span>
        <div className='flex flex-wrap gap-2 '>
          {idea?.Files.map((f, i) => (
            <div
              className='rounded-md border-2 border-slate-500 p-2'
              key={f.id}
            >
              <UnderlineLink href={f.url}>lampiran {i}</UnderlineLink>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className='flex flex-wrap justify-end gap-x-4 text-slate-700'>
      <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
        <div className='flex flex-col'>
          <span className='text-xs'>Permintaan Dana :</span>
          <span>Rp. {idea.required_fund}</span>
        </div>
      </div>

      <div className='flex min-w-[288px] items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
        <div className='flex flex-col'>
          <span className='text-xs'>Pembuat :</span>
          <span>{idea.Users?.name}</span>
        </div>
      </div>
    </div>

    <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
      <div className='flex flex-col'>
        <span className='text-xs'>Alasan Ditolak :</span>
        <div className='flex flex-wrap gap-2 '>
          {idea?.Reject_fund_reasons.map((f) => (
            <div className='' key={f.id}>
              {f.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AdminIdeaDetail: NextPageWithLayoutAndAuth = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const ideaQuery = useQuery(
    'admin/idea/id',
    () => fetchJson<ApiResponse>(`/api/idea/${id}`),
    {
      enabled: id !== undefined,
    }
  );

  return (
    <>
      <Seo templateTitle='Admin Ide Bisnis' />
      {ideaQuery.isLoading && (
        <>
          <span>sedang memuat data . . .</span>
        </>
      )}

      {ideaQuery.isSuccess && ideaQuery.data.data?.status === 'panding' && (
        <PandingIdeaSection idea={ideaQuery.data.data} />
      )}

      {ideaQuery.isSuccess && ideaQuery.data.data?.status === 'funded' && (
        <FundedIdeaSection idea={ideaQuery.data.data} />
      )}

      {ideaQuery.isSuccess && ideaQuery.data.data?.status === 'canceled' && (
        <CanceledIdeaSection idea={ideaQuery.data.data} />
      )}
    </>
  );
};

AdminIdeaDetail.Auth = { role: 'admin' };
AdminIdeaDetail.Layout = AdminLayout;

export default AdminIdeaDetail;
