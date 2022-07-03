import * as React from 'react';

import Header from '@/components/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <div className='min-h-screen w-full'>
        <div className='mx-auto max-w-screen-2xl pt-14'>
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
