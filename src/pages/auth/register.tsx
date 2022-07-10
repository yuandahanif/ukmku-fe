import { useRouter } from 'next/router';
import { FormEventHandler } from 'react';
import { useMutation } from 'react-query';
import { z } from 'zod';

import fetchJson from '@/lib/fatchJson';

import Button from '@/components/buttons/Button';
import Seo from '@/components/Seo';

export default function Register() {
  const router = useRouter();
  const registerMutation = useMutation(
    'user/register',
    (body: string) =>
      fetchJson('/api/user/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body,
      }),
    {
      onSuccess: () => {
        router.push('/api/auth/signin');
      },
    }
  );

  const onRegister: FormEventHandler<HTMLFormElement> = (e) => {
    try {
      e.preventDefault();
      const form = e.currentTarget;
      const schema = z.object({
        username: z.string(),
        name: z.string(),
        password: z.string(),
        email: z.string().email(),
      });

      const data = schema.parse({
        username: form.username.value,
        name: form.fullName.value,
        email: form.email.value,
        password: form.password.value,
      });

      registerMutation.mutate(JSON.stringify(data));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main className='flex h-screen items-center justify-center bg-slate-200'>
      <Seo templateTitle='Daftar' />
      <div className='w-full max-w-screen-sm rounded-md bg-white p-10 shadow-md'>
        <h1 className='text-3xl text-slate-600'>Daftar</h1>

        <form onSubmit={onRegister} method='post' className='space-y-2'>
          <label className='flex flex-col'>
            <span>Username</span>
            <input
              type='text'
              name='username'
              className='rounded border border-gray-600 py-1.5 focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-400'
            />
          </label>
          <label className='flex flex-col'>
            <span>Nama</span>
            <input
              type='text'
              name='fullName'
              className='rounded border border-gray-600  py-1.5 focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-400'
            />
          </label>
          <label className='flex flex-col'>
            <span>Password</span>
            <input
              type='password'
              name='password'
              className='rounded border border-gray-600 py-1.5  focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-400'
            />
          </label>
          <label className='flex flex-col'>
            <span>Email</span>
            <input
              type='email'
              name='email'
              className='rounded border border-gray-600 py-1.5 focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-400'
            />
          </label>

          <Button variant='primary' type='submit'>
            Daftar
          </Button>
        </form>
      </div>
    </main>
  );
}
