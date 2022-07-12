import { Financial_reports, Users } from '@prisma/client';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import fetchJson from '@/lib/fatchJson';

import AdminLayout from '@/components/layout/Admin.layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

const AdminIdeaDetail: NextPageWithLayoutAndAuth = () => {
  const router = useRouter();
  const reportId = Number(router.query.id);

  const profitQuery = useQuery(
    'admin/idea/id/financial/detail',
    () =>
      fetchJson<
        Financial_reports & {
          Files: {
            id: number;
            url: string;
          }[];
          Ideas: {
            id: number;
          } | null;
          User: Users;
        }
      >(`/api/financial/${reportId}`),
    {
      enabled: reportId != null,
    }
  );

  return (
    <>
      <Seo templateTitle='Admin Ide Bisnis' />
      {profitQuery.isLoading && (
        <>
          <span>sedang memuat data . . .</span>
        </>
      )}

      {profitQuery.data?.data?.id && (
        <>
          <div className=' flex flex-col gap-y-4 text-slate-700'>
            <h1 className='text-3xl'>{profitQuery.data.data.title}</h1>

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
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <div className='flex flex-col'>
                  <span className='text-xs'>Periode :</span>
                  <span>
                    {profitQuery.data.data.month} {profitQuery.data.data.year}
                  </span>
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
                    d='M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
                  />
                </svg>
                <div className='flex flex-col'>
                  <span className='text-xs'>Pengeluaran :</span>
                  <span>{profitQuery.data.data.fund}</span>
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
                    d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                  />
                </svg>
                <div className='flex flex-col'>
                  <span className='text-xs'>Pendapatan :</span>
                  <span>{profitQuery.data.data.profit}</span>
                </div>
              </div>
            </div>

            <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
              <div className='flex flex-col gap-y-3'>
                <span className='text-xs'>Deskripsi :</span>
                <p className=''>{profitQuery.data.data.description}</p>
              </div>
            </div>

            <div className='flex w-full items-center gap-x-2 rounded-md border-2 border-slate-500 p-2'>
              <div className='flex flex-col gap-y-1'>
                <span className='text-xs'>Lampiran :</span>
                <div className='flex flex-wrap gap-2 '>
                  {profitQuery.data.data.Files.map((f, i) => (
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
          </div>
        </>
      )}
    </>
  );
};

AdminIdeaDetail.Auth = { role: 'admin' };
AdminIdeaDetail.Layout = AdminLayout;

export default AdminIdeaDetail;
