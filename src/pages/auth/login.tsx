import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return <p>Signed in as {session?.user?.email}</p>;
  }

  return (
    <Link href='/api/auth/signin' passHref>
      <a>Sign in</a>
    </Link>
  );
}
