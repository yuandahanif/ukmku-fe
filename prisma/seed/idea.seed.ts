/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { Ideas_status, Prisma } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

export default async function idea_seeder() {
  console.log('seeding . . . . . ideas');

  faker.setLocale('id_ID');

  const categories = await prisma.categories.findMany({
    where: { clasification: 'idea' },
  });
  const users = await prisma.users.findMany({
    where: { role: 'umkm' },
  });

  if (!categories) return new Error('no categories');
  if (!users) return new Error('no users');

  const ideas: Prisma.IdeasCreateManyInput[] = [];

  users.forEach((user) => {
    categories.forEach((category) => {
      if (faker.datatype.boolean()) {
        const status: Ideas_status = [
          Ideas_status.canceled,
          Ideas_status.funded,
          Ideas_status.panding,
        ][Math.floor(Math.random() * 3)];

        ideas.push({
          name: faker.company.bs(),
          description: faker.lorem.paragraphs(),
          location: faker.address.city(),
          required_fund: Number(faker.random.numeric(8)),
          CategoryId: category.id,
          UserId: user.id,
          status,
        });
      }
    });
  });

  return prisma.ideas.createMany({
    data: ideas,
  });
}
