import * as React from 'react';

import HeaderAdmin from '@/components/header/Header.admin';
import SidebarAdmin from '@/components/sidebar/Sidebar.admin';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen w-full'>
      <div className='mx-auto flex min-h-screen max-w-screen-2xl flex-col'>
        <div className='flex min-h-screen shadow-md'>
          <SidebarAdmin />
          <div className='flex h-full w-full flex-col'>
            <HeaderAdmin />
            <div className='px-3 py-4'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
