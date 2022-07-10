// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function get_all_idea(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const panding_idea = await prisma.ideas.findMany({
        include: { Users: { select: { name: true } }, Categories: true },
        where: {
          status: 'panding',
        },
      });

      const canceled_idea = await prisma.ideas.findMany({
        include: { Users: { select: { name: true } }, Categories: true },
        where: {
          status: 'canceled',
        },
      });

      const funded_idea = await prisma.ideas.findMany({
        include: { Users: { select: { name: true } }, Categories: true },
        where: {
          status: 'funded',
        },
      });

      return res.send({
        status: 'success',
        data: {
          pending: panding_idea,
          canceled: canceled_idea,
          funded: funded_idea,
        },
      });
    }
    throw new Error(
      'You must be signed in to view the protected content on this page.'
    );
  } catch (error) {
    res.send({
      message: error,
    });
  }
}
