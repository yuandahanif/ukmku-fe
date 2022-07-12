// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function financial(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const schema = z.string();
      const id = schema.parse(req.query.id);
      const financial = await prisma.financial_reports.findMany({
        select: { id: true, fund: true, profit: true, month: true, year: true },
        where: {
          IdeaId: Number(id),
        },
        orderBy: [{ createdAt: 'desc' }],
      });

      return res.send({
        status: 'success',
        data: financial,
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
