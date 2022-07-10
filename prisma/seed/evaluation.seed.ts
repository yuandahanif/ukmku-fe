/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

/* eslint-disable no-console */
export default async function evaluation() {
  console.log('seeding . . . . . evaluation');

  faker.setLocale('id_ID');

  const ideas = await prisma.ideas.findMany({
    where: { status: 'funded' },
  });

  if (!ideas) return new Error('no evaluation');

  const evaluations: Prisma.EvaluationsCreateManyInput[] = [];
  ideas.forEach((idea) => {
    for (let i = 0; i < 12; i++) {
      evaluations.push({
        name: `Laporan Permasalahan untuk UMKM ${idea.name}`,
        description: faker.lorem.sentences(),
        location: idea.location,
        umkm_name: idea.name,
      });
    }
  });

  return prisma.evaluations.createMany({
    data: evaluations,
  });
}
