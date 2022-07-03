import { signOut, useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import useClickOutside from '@/lib/hooks/useClickOutside';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';

const ProfilePopup = () => {
  const { data } = useSession();
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsProfileVisible(false);
  });

  return (
    <div className='relative'>
      <button type='button' onClick={() => setIsProfileVisible(true)}>
        <NextImage
          useSkeleton
          className='w-12 overflow-hidden rounded-full object-center'
          src='/favicon/apple-icon-180x180.png'
          width='20'
          height='20'
          alt='Profile'
        />
      </button>

      {isProfileVisible && (
        <div
          ref={ref}
          className='absolute top-0 right-0 flex w-72 flex-col items-center rounded-md bg-white p-4 shadow-md'
        >
          <NextImage
            useSkeleton
            className='w-20 overflow-hidden rounded-full object-center'
            src='/favicon/apple-icon-180x180.png'
            width='20'
            height='20'
            alt='Profile'
          />

          <span className='mt-2 text-sm'>{data?.user.name}</span>

          <ul className='mt-3 w-full space-y-2 border-t pt-3 text-center'>
            <li>
              <UnstyledLink className='text-sm' href='/'>
                Dashboard
              </UnstyledLink>
            </li>
            <li>
              <UnstyledLink className='text-sm' href='/'>
                Profile
              </UnstyledLink>
            </li>
            <li>
              <UnstyledLink className='text-sm' href='/'>
                Tentang
              </UnstyledLink>
            </li>
            <li>
              <Button
                variant='ghost'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Keluar
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
