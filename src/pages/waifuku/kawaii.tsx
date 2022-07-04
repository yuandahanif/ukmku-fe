import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import Logo from '~/images/logo-egg.svg';

const WaifukuKawaii = () => {
  return (
    <div className='min-h-screen w-full'>
      <Seo
        templateTitle='waifuku'
        description='ini halaman Easter ege. Cuma buat iseng, buat ngilangin stress aja.'
      />
      <div className='mx-auto flex min-h-screen max-w-screen-2xl flex-col pt-20'>
        <header className='fixed top-0 z-50 w-full max-w-screen-2xl border-b bg-white'>
          <nav className='flex items-center justify-start px-8'>
            <UnstyledLink href='/'>
              <Logo className='h-16 w-40' />
            </UnstyledLink>
          </nav>
        </header>

        <main className='flex min-h-full w-full flex-col items-center justify-center pb-20'>
          {/* <NextImage
            useSkeleton
            className='w-80 overflow-hidden rounded-full object-center'
            src='/favicon/apple-icon-180x180.png'
            width='20'
            height='20'
            alt='Profile'
          /> */}

          {/* <iframe
            className='min-h-screen w-full'
            src='https://virtualyoutuber.fandom.com/wiki/Nakiri_Ayame'
            frameBorder='0'
          ></iframe> */}
          <iframe
            width='560'
            height='315'
            className='min-h-screen w-full'
            src='https://www.youtube.com/embed/ECkxzFgbJqQ'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </main>
      </div>
    </div>
  );
};

export default WaifukuKawaii;
