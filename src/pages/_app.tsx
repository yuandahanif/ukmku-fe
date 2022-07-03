import { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Auth } from 'types/Auth';
import CustomNextPage from 'types/custom_next_page';

import '@/styles/globals.css';

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomNextPage;
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {Component.Auth ? (
          <Auth setting={Component.Auth}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

function Auth({ children, setting }: { children: JSX.Element; setting: Auth }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data, status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (data && data.user.role !== setting.role) {
    return <div>upss, wrong role</div>;
  }

  return children;
}

export default MyApp;
