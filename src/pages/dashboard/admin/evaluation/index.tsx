import { NextPageWithLayoutAndAuth } from 'types/custom_next_page';

import ArrowLink from '@/components/links/ArrowLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

const AdminEvaluationIndex: NextPageWithLayoutAndAuth = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-red-200'>
      <Seo templateTitle='Admin Evaluasi' />

      <div className='flex flex-col items-center justify-center gap-y-4 rounded-md bg-white p-4 shadow-md'>
        <NextImage
          useSkeleton
          className='w-96 object-center'
          src='https://external-preview.redd.it/kTk_lPVsZAhVglS0yFCzIO8KWNv2T4QOlljrmfiGGHY.jpg?auto=webp&s=33f89ff6a8a2d839e611e32e939f4d2e7bc1e66d'
          width='20'
          height='20'
          alt='Profile'
        />
        <div className='w-full text-center'>
          <a
            target='_blank'
            href='https://www.reddit.com/r/ProgrammerHumor/comments/a2c4gg/quality_assurance/?utm_source=share&utm_medium=web2x&context=3'
            rel='noreferrer'
          >
            r/ProgrammerHumor
          </a>

          {/* <hr className='mb-4 mt-2' /> */}
          {/* 
          <span className='text-center text-lg text-gray-700'>
            Oops! bagian Evaluasi belum dibuat!
          </span> */}

          <hr className='mb-4 mt-2 w-full' />

          <ArrowLink
            as={UnstyledLink}
            direction='left'
            className='mt-2 inline-flex items-center'
            href='/dashboard/admin'
          >
            Kembali
          </ArrowLink>
        </div>
      </div>
    </div>
  );
};

AdminEvaluationIndex.Auth = { role: 'admin' };

export default AdminEvaluationIndex;
