/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

/* eslint-disable no-console */
export default async function funded_idea_seeder() {
  console.log('seeding . . . . . rejected ideas');

  faker.setLocale('id_ID');

  const ideas = await prisma.ideas.findMany({
    where: { status: 'funded' },
  });

  if (!ideas) return new Error('no funded ideas');

  const funded_ideas: Prisma.Fund_transactionsCreateManyInput[] = [];
  ideas.forEach((idea) => {
    funded_ideas.push({
      total: idea.required_fund + Number(faker.random.numeric(6)),
      IdeaId: idea.id,
    });
  });

  return prisma.fund_transactions.createMany({
    data: funded_ideas,
  });
}
