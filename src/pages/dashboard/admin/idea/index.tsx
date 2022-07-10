import { useMemo } from 'react';
import { useTable } from 'react-table';
import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import AdminLayout from '@/components/layout/Admin.layout';
import Seo from '@/components/Seo';

const AdminIdeaIndex: NextPageWithLayoutAndAuth = () => {
  const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        id: 'no',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        accessor: (_: any, index: number) => (
          <span className='inline-block px-2'>{index + 1}</span>
        ),
      },
      {
        Header: 'Name',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        id: 'col2',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        accessor: (row: any) => (
          <span className='inline-block w-60 '>{row?.col2}</span>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Record<string, unknown>>({ data, columns });

  return (
    <>
      <Seo templateTitle='Admin Ide Bisnis' />
      <div className=''>
        <table {...getTableProps()} className='w-fit'>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...restProps } = column.getHeaderProps();
                    return (
                      <th
                        key={key}
                        {...restProps}
                        className='w-fit border bg-gray-300 py-1'
                      >
                        {column.render('Header')}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              const { key, ...restProps } = row.getRowProps();
              return (
                <tr key={key} {...restProps}>
                  {row.cells.map((cell) => {
                    const { key, ...restProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...restProps}
                        className='w-fit border py-1 px-2'
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

AdminIdeaIndex.Auth = { role: 'admin' };
AdminIdeaIndex.Layout = AdminLayout;

export default AdminIdeaIndex;
