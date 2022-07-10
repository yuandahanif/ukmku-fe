import { Column, useTable } from 'react-table';

interface Props {
  columns: readonly Column<Record<string, unknown>>[];
  data: readonly Record<string, unknown>[];
}

const Table: React.FC<Props> = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Record<string, unknown>>({ data, columns });

  return (
    <div>
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
  );
};

export default Table;
