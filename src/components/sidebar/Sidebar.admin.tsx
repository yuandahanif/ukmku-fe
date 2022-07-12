import UnstyledLink from '@/components/links/UnstyledLink';

import Logo from '~/images/logo.svg';

const SidebarAdmin = () => {
  const defaultClassName = 'bg-yellow-100 text-slate-800 hover:bg-yellow-300';
  const activeClassName =
    'bg-yellow-500 hover:bg-yellow-300 text-white hover:text-slate-800';

  return (
    <aside className='flex w-96 flex-col items-center bg-yellow-200 py-0'>
      <UnstyledLink href='/'>
        <Logo className='h-16 w-40' />
      </UnstyledLink>

      <nav className='mt-10 w-full px-4'>
        <ul className='space-y-4'>
          <li>
            <UnstyledLink
              href='/dashboard/admin'
              className={defaultClassName}
              activeClassName={activeClassName}
            >
              <button
                type='button'
                className='flex w-full items-center justify-center gap-x-1 rounded-md bg-inherit py-2 text-lg font-semibold text-inherit  duration-300 hover:bg-inherit'
              >
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
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  />
                </svg>
                Dashboard
              </button>
            </UnstyledLink>
          </li>
          <li>
            <UnstyledLink
              href='/dashboard/admin/idea'
              className={defaultClassName}
              activeClassName={activeClassName}
            >
              <button
                type='button'
                className='flex w-full items-center justify-center gap-x-1 rounded-md bg-inherit py-2 text-lg font-semibold text-inherit  duration-300 hover:bg-inherit'
              >
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
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                Ide Bisnis
              </button>
            </UnstyledLink>
          </li>
          <li>
            <UnstyledLink
              href='/dashboard/admin/report'
              className={defaultClassName}
              activeClassName={activeClassName}
            >
              <button
                type='button'
                className='flex w-full items-center justify-center gap-x-1 rounded-md bg-inherit py-2 text-lg font-semibold text-inherit  duration-300 hover:bg-inherit'
              >
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
                    d='M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
                  />
                </svg>
                Laporan Penggunaan
              </button>
            </UnstyledLink>
          </li>
          <li>
            <UnstyledLink
              href='/'
              className={defaultClassName}
              activeClassName={activeClassName}
            >
              <button
                type='button'
                className='flex w-full items-center justify-center gap-x-1 rounded-md bg-inherit py-2 text-lg font-semibold text-inherit  duration-300 hover:bg-inherit'
              >
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
                    d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                  />
                </svg>
                Evaluasi
              </button>
            </UnstyledLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
