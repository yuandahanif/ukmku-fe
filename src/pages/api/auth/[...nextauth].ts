import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Role } from 'types/Auth';

import fetchJson from '@/lib/fatchJson';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'usenrname/password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (
          credentials?.username == undefined ||
          credentials?.password == undefined
        ) {
          return null;
        }

        return {
          username: credentials?.username,
          password: credentials?.password,
        };
      },
    }),
  ],

  session: { strategy: 'jwt' },
  jwt: {
    // A secret to use for key generation. Defaults to the top-level `session`.
    secret: process.env.JWT_SECRET_KEY as string,
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },

  callbacks: {
    async signIn({ user, credentials }) {
      try {
        const { data, code } = await fetchJson<{
          id: string;
          token: string;
          email: string;
          role: Role;
          name: string;
        }>((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        if (code == '200') {
          user.id = data.id;
          user.email = data.email;
          user.name = data.name;
          user.role = data.role;
          user.token = data.token;

          return true;
        }

        return false;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.AccessToken = token.token;
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };

      return session;
    },
  },
});
