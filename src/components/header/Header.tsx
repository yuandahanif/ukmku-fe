import { signIn, useSession } from 'next-auth/react';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import ProfilePopup from '@/components/popup/Profile';

import Logo from '~/images/logo.svg';

const Header = () => {
  const { status } = useSession();

  return (
    <header className='fixed top-0 z-50 w-full max-w-screen-2xl border-b bg-white'>
      <nav className='flex items-center justify-between px-8'>
        <UnstyledLink href='/'>
          <Logo className='h-16 w-40' />
        </UnstyledLink>
        <div className='space-x-1'>
          {status === 'loading' && <Button isLoading variant='ghost' />}
          {status === 'unauthenticated' && (
            <>
              <ButtonLink variant='ghost' href='/auth/register'>
                Daftar
              </ButtonLink>
              <Button variant='ghost' onClick={() => signIn('credentials')}>
                Masuk
              </Button>
            </>
          )}

          {status === 'authenticated' && <ProfilePopup />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
