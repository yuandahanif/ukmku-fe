import { AppProps } from 'next/app';
import { Auth } from 'types/Auth';

export type LayoutAndAuth = {
  Layout?: ({ children }: { children: React.ReactNode }) => JSX.Element;
  Auth: Auth;
};

export type NextPageWithLayoutAndAuth = { (): JSX.Element } & LayoutAndAuth;

type CustomNextPage = AppProps['Component'] & LayoutAndAuth;

export default CustomNextPage;
