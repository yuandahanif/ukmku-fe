// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function profit_statistic(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const year = 2021;
      const profit = await prisma.financial_reports.groupBy({
        by: ['year', 'month'],
        _sum: { profit: true, fund: true },
        where: { year: year },
        orderBy: [{ month: 'asc' }],
      });

      return res.send({
        status: 'success',
        data: profit,
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
