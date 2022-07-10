import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

const prisma = new PrismaClient();

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
          username: credentials.username,
          password: credentials.password,
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
        const schema = z.object({
          username: z.string(),
          password: z.string(),
        });

        const validated = schema.parse({
          username: credentials?.username,
          password: credentials?.password,
        });

        const data = await prisma.users.findFirst({
          where: {
            username: validated.username,
            password: validated.password,
          },
        });

        if (data) {
          user.id = String(data.id);
          user.email = data.email;
          user.name = data.name;
          user.role = data.role;

          return true;
        }

        throw 'user not found';
      } catch (error) {
        // return error;
        return '/unauthorized';
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
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
