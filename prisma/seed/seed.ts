/* eslint-disable no-console */
import category_seeder from './category.seed';
import evaluation from './evaluation.seed';
import evaluation_survei from './evaluation_survei.seed';
import file_seeder from './file.seed';
import financial_report from './financial_report.seed';
import funded_idea_seeder from './funded_idea.seed';
import idea_seeder from './idea.seed';
import rejected_idea_seeder from './rejected_idea.seed';
import user_seeder from './user.seed';
import { prisma } from '../../src/lib/prisma';

async function main() {
  try {
    const admin = await prisma.users.upsert({
      where: { email: 'yuan@gmail.com' },
      update: {},
      create: {
        username: 'admin',
        name: 'si paling admin',
        password:
          '$2a$10$wNTu.mOnChxvNm/jkLqL3OIdCe0y66eUgsR07suJPTq30Vaf7TjWW',
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
        password:
          '$2a$10$yDR6ZXCCayehAzieJ2uBe.AQgMKLVjmMiehN.iN6eKdeoKAiaHcam',
        email: 'yuan.nanode@gmail.com',
        role: 'umkm',
      },
    });

    console.log('seeding . . . . . ');
    console.log(admin, umkm);

    await user_seeder();
    await category_seeder();
    await idea_seeder();
    await rejected_idea_seeder();
    await funded_idea_seeder();
    await financial_report();
    await evaluation();
    await evaluation_survei();
    await file_seeder();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
