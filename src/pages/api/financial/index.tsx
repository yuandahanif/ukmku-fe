// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function financialAll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const reports = await prisma.financial_reports.findMany({
        orderBy: [{ createdAt: 'desc' }],
        include: { Ideas: { select: { name: true, id: true } } },
        take: 100,
      });

      return res.send({
        status: 'success',
        data: reports,
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
