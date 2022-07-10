/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { prisma } from '../../src/lib/prisma';

export default async function user_seeder() {
  console.log('seeding . . . . . users');

  faker.setLocale('id_ID');
  const random = 3 + Number(faker.random.numeric(2));
  const users: Prisma.UsersCreateManyInput[] = [];

  for (let i = 0; i < random; i++) {
    const password = bcrypt.hashSync(faker.animal.cat(), 10);
    const name = faker.name.firstName();

    users.push({
      username: faker.internet.userName(name),
      name: faker.name.findName(name),
      password: password,
      email: faker.internet.email(name),
      role: 'umkm',
    });
  }

  return prisma.users.createMany({
    data: users,
  });
}
