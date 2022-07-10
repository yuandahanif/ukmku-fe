/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { Month, Prisma } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

/* eslint-disable no-console */
export default async function financial_report() {
  console.log('seeding . . . . . financial report');

  faker.setLocale('id_ID');

  const ideas = await prisma.ideas.findMany({
    where: { status: 'funded' },
  });

  if (!ideas) return new Error('no financial report');

  const financual_reports: Prisma.Financial_reportsCreateManyInput[] = [];
  ideas.forEach((idea) => {
    for (let i = 0; i < 12; i++) {
      const month_enum: Month[] = [
        'januari',
        'februari',
        'maret',
        'april',
        'mei',
        'juni',
        'juli',
        'agustus',
        'september',
        'oktober',
        'november',
        'desember',
      ];

      const month = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
      const createdAt = new Date(`2021-${month}-03T03:24:00`);

      financual_reports.push({
        title: `Laporan bulan-${i + 1} ${idea.name}`,
        description: faker.lorem.sentences(),
        fund: Number(faker.random.numeric(6)),
        profit: Number(faker.random.numeric(6)),
        IdeaId: idea.id,
        year: createdAt.getFullYear(),
        month: month_enum[i],
        createdAt: createdAt.toISOString(),
      });
    }
  });

  return prisma.financial_reports.createMany({
    data: financual_reports,
  });
}
