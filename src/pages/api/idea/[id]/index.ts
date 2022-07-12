// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function get_idea_byId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const schema = z.string();
      const id = schema.parse(req.query.id);
      const idea = await prisma.ideas.findFirstOrThrow({
        include: {
          Users: true,
          Categories: true,
          Reject_fund_reasons: true,
          Files: true,
          Fund_transactions: true,
        },
        where: {
          id: Number(id),
        },
      });

      return res.send({
        status: 'success',
        data: {
          ...idea,
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
