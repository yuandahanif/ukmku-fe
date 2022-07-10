/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

/* eslint-disable no-console */
export default async function evaluation_survei() {
  console.log('seeding . . . . . evaluation survei');

  faker.setLocale('id_ID');

  const ideas = await prisma.ideas.findMany({
    where: { status: 'funded' },
  });

  if (!ideas) return new Error('no evaluation survei');

  const evaluations_survei: Prisma.Evaluation_surveisCreateManyInput[] = [];
  ideas.forEach((idea) => {
    for (let i = 0; i < faker.mersenne.rand(20, 5); i++) {
      const rand = faker.mersenne.rand(12, 1);
      const month = rand < 10 ? `0${rand}` : `${rand}`;
      evaluations_survei.push({
        name: `Evaluasi untuk UMKM ${idea.name} bulan ${month}`,
        done_at: new Date(`2021-${month}-03T03:24:00`).toISOString(),
        IdeaId: idea.id,
      });
    }
  });

  return prisma.evaluation_surveis.createMany({
    data: evaluations_survei,
  });
}
