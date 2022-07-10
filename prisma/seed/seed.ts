/* eslint-disable no-console */
import { prisma } from '@/lib/prisma';

async function main() {
  const admin = await prisma.users.upsert({
    where: { email: 'yuan@gmail.com' },
    update: {},
    create: {
      username: 'admin',
      name: 'si paling admin',
      password: '$2a$10$wNTu.mOnChxvNm/jkLqL3OIdCe0y66eUgsR07suJPTq30Vaf7TjWW',
      email: 'yuan@gmail.com',
      role: 'admin',
    },
  });

  const umkm = await prisma.users.upsert({
    where: { email: 'yuan.nanode@gmail.com' },
    update: {},
    create: {
      username: 'umkm',
      name: 'si umkm',
      password: '$2a$10$yDR6ZXCCayehAzieJ2uBe.AQgMKLVjmMiehN.iN6eKdeoKAiaHcam',
      email: 'yuan.nanode@gmail.com',
      role: 'umkm',
    },
  });

  console.log('seeding . . . . . ');
  console.log(admin, umkm);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
