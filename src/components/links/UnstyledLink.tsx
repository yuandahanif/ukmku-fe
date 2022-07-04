import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  activeClassName?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & React.ComponentPropsWithRef<'a'>;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  (
    {
      children,
      href,
      openNewTab,
      className,
      activeClassName = '',
      nextLinkProps,
      ...rest
    },
    ref
  ) => {
    const router = useRouter();

    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#');

    if (!isNewTab) {
      return (
        <Link href={href} {...nextLinkProps}>
          <a
            ref={ref}
            {...rest}
            className={clsxm(
              className,
              router.pathname == href ? activeClassName : ''
            )}
          >
            {children}
          </a>
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...rest}
        className={clsxm(
          'cursor-newtab',
          className,
          router.pathname == href ? activeClassName : ''
        )}
      >
        {children}
      </a>
    );
  }
);

export default UnstyledLink;
