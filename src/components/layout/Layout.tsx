import * as React from 'react';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <div className='min-h-screen w-full'>
        <div className='mx-auto flex min-h-screen max-w-screen-2xl flex-col pt-20'>
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
