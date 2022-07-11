import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import ArrowLink from '@/components/links/ArrowLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

const UMKMDashboardIndex: NextPageWithLayoutAndAuth = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-red-200'>
      <Seo templateTitle='UMKM Beranda' />

      <div className='flex flex-col items-center justify-center gap-y-4 rounded-md bg-white p-4 shadow-md'>
        <NextImage
          useSkeleton
          className='w-56 object-center'
          src='/images/ayame-smug.jpg'
          width='20'
          height='20'
          alt='Profile'
        />
        <div className='max-w-sm text-center'>
          <span className='text-center text-lg text-gray-700'>
            Oops! bagian UMKM belum dibuat!
          </span>

          <hr className='mb-4 mt-2' />

          <code className='text-center'>
            Tapi tenang, Anda bisa login sebagai{' '}
            <span className='inline-block bg-yellow-200 px-1'>admin</span>{' '}
            menggunakan kredensial <br />
            <var>admin:123456</var>
          </code>

          <hr className='mt-4 mb-2' />

          <code>Selamat mencoba.</code>
          <br />
          <ArrowLink
            as={UnstyledLink}
            direction='left'
            className='mt-2 inline-flex items-center'
            href='/'
          >
            Beranda
          </ArrowLink>
        </div>
      </div>
    </div>
  );
};

UMKMDashboardIndex.Auth = { role: 'umkm' };

export default UMKMDashboardIndex;
