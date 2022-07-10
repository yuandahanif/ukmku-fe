import { Categories_clasification, Ideas, Users } from '@prisma/client';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import fetchJson from '@/lib/fatchJson';

import Button from '@/components/buttons/Button';
import AdminLayout from '@/components/layout/Admin.layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

const AdminIdeaIndex: NextPageWithLayoutAndAuth = () => {
  const [tableType, setTableType] = useState<'panding' | 'canceled' | 'funded'>(
    'panding'
  );

  const ideaQuery = useQuery('admin/idea/all', () =>
    fetchJson<{
      pending: (Ideas & Categories_clasification & Users)[];
      canceled: (Ideas & Categories_clasification & Users)[];
      funded: (Ideas & Categories_clasification & Users)[];
    }>('/api/idea')
  );

  const pandingTableData = useMemo(() => {
    if (ideaQuery.data?.data.pending) {
      return ideaQuery.data?.data.pending;
    }

    return [];
  }, [ideaQuery.data?.data.pending]);

  const pandingTableColumn = useMemo(
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
        Header: 'Nama UMKM',
        accessor: 'name',
      },
      {
        Header: 'Permintaan Modal',
        accessor: 'required_fund',
        Cell: ({ value }: { value: string | number }) => (
          <span className='inline-block w-60 text-center'>{value}</span>
        ),
      },
      {
        Header: 'Oleh',
        accessor: 'Users.name',
      },
      {
        Header: 'Kategori',
        accessor: 'Categories.name',
      },
      {
        Header: 'Aksi',
        accessor: 'id',
        Cell: ({ value }: { value: string | number }) => (
          <div>
            <ButtonLink
              variant='outline'
              href={`/dashboard/admin/idea/${value}`}
            >
              Detail
            </ButtonLink>
          </div>
        ),
      },
    ],
    []
  );

  const canceledTableData = useMemo(() => {
    if (ideaQuery.data?.data.canceled) {
      return ideaQuery.data?.data.canceled;
    }

    return [];
  }, [ideaQuery.data?.data.canceled]);

  const fundedTableData = useMemo(() => {
    if (ideaQuery.data?.data.funded) {
      return ideaQuery.data?.data.funded;
    }

    return [];
  }, [ideaQuery.data?.data.funded]);

  return (
    <>
      <Seo templateTitle='Admin Ide Bisnis' />
      <div className=''>
        <div className='mb-1 flex justify-end gap-x-4'>
          <Button
            variant={tableType == 'panding' ? 'primary' : 'outline'}
            disabled={tableType == 'panding'}
            type='button'
            onClick={() => setTableType('panding')}
          >
            Pengajuan
          </Button>
          <Button
            variant={tableType == 'funded' ? 'primary' : 'outline'}
            disabled={tableType == 'funded'}
            type='button'
            onClick={() => setTableType('funded')}
          >
            Didanai
          </Button>
          <Button
            variant={tableType == 'canceled' ? 'primary' : 'outline'}
            disabled={tableType == 'canceled'}
            type='button'
            onClick={() => setTableType('canceled')}
          >
            Ditolak
          </Button>
        </div>
        {tableType == 'panding' && ideaQuery.data?.data.pending && (
          <>
            <h2 className='mb-1 text-xl'>Daftar pengajuan UMKM</h2>
            <span className='mb-3 inline-block'>
              Total: {ideaQuery.data?.data.pending.length}
            </span>
            <Table
              columns={pandingTableColumn as never}
              data={pandingTableData as never}
            />
          </>
        )}

        {tableType == 'funded' && ideaQuery.data?.data.funded && (
          <>
            <h2 className='mb-1 text-xl'>Daftar pengajuan UMKM didanai</h2>
            <span className='mb-3 inline-block'>
              Total: {ideaQuery.data?.data.funded.length}
            </span>
            <Table
              columns={pandingTableColumn as never}
              data={fundedTableData as never}
            />
          </>
        )}

        {tableType == 'canceled' && ideaQuery.data?.data.canceled && (
          <>
            <h2 className='mb-1 text-xl'>Daftar pengajuan UMKM ditolak</h2>
            <span className='mb-3 inline-block'>
              Total: {ideaQuery.data?.data.canceled.length}
            </span>
            <Table
              columns={pandingTableColumn as never}
              data={canceledTableData as never}
            />
          </>
        )}
      </div>
    </>
  );
};

AdminIdeaIndex.Auth = { role: 'admin' };
AdminIdeaIndex.Layout = AdminLayout;

export default AdminIdeaIndex;
