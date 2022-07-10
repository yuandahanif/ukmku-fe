/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

/* eslint-disable no-console */
export default async function rejected_idea_seeder() {
  console.log('seeding . . . . . rejected ideas');

  faker.setLocale('id_ID');

  const ideas = await prisma.ideas.findMany({
    where: { status: 'canceled' },
  });

  if (!ideas) return new Error('no rejected ideas');

  const rejected_ideas: Prisma.Reject_fund_reasonsCreateManyInput[] = [];
  ideas.forEach((idea) => {
    rejected_ideas.push({
      IdeaId: idea.id,
      description: faker.lorem.sentences(),
    });
  });

  return prisma.reject_fund_reasons.createMany({
    data: rejected_ideas,
  });
}
