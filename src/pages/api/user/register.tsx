import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const password = bcrypt.hashSync(body?.password, 10);

    const user = await prisma.users.create({
      data: {
        username: body?.username,
        name: body?.name,
        password: password,
        email: body?.email,
        role: 'umkm',
      },
    });

    if (user) {
      res.status(200).json({ status: 'success', data: 'Berhasil mendaftar' });
    }
  } catch (error) {
    res.status(200).json(error);
  }
}
