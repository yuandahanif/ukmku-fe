/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

/* eslint-disable no-console */
export default async function file_seeder() {
  console.log('seeding . . . . . file');

  faker.setLocale('id_ID');

  const ideas = await prisma.ideas.findMany();
  const financial_report = await prisma.financial_reports.findMany();
  const evaluation = await prisma.evaluations.findMany();
  const evaluation_survei = await prisma.evaluation_surveis.findMany();

  if (!ideas) return new Error('no file');

  const files: Prisma.FilesCreateManyInput[] = [];

  ideas.forEach((idea) => {
    for (let i = 0; i < faker.mersenne.rand(8, 1); i++) {
      files.push({
        name: `${idea.name}${faker.database.mongodbObjectId()}`,
        url: faker.image.business(),
        ideasId: idea.id,
      });
    }
  });

  financial_report.forEach((financial_r) => {
    for (let i = 0; i < faker.mersenne.rand(3, 1); i++) {
      files.push({
        name: `${financial_r.title}-${faker.database.mongodbObjectId()}`,
        url: faker.image.cats(),
        financial_reportsId: financial_r.id,
      });
    }
  });

  evaluation.forEach((eva) => {
    for (let i = 0; i < faker.mersenne.rand(3, 1); i++) {
      files.push({
        name: `${eva.name}-${faker.database.mongodbObjectId()}`,
        url: faker.image.imageUrl(),
        evaluationsId: eva.id,
      });
    }
  });

  evaluation_survei.forEach((evas) => {
    for (let i = 0; i < faker.mersenne.rand(5, 1); i++) {
      files.push({
        name: `${evas.name}-${faker.database.mongodbObjectId()}`,
        url: faker.image.imageUrl(),
        evaluation_surveisId: evas.id,
      });
    }
  });

  return prisma.files.createMany({
    data: files,
  });
}
