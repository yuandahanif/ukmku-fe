/* eslint-disable no-console */
import { Prisma } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

export const categories: Prisma.Enumerable<Prisma.CategoriesCreateManyInput> = [
  { name: 'Jasa', clasification: 'idea' },
  { name: 'Makanan & Minuman', clasification: 'idea' },
  { name: 'Kesehatan', clasification: 'idea' },
  { name: 'Bahan Baku', clasification: 'idea' },
  { name: 'Pertanian & Peternakan', clasification: 'idea' },
  { name: 'Polusi', clasification: 'evaluation' },
  { name: 'Kesehatan', clasification: 'evaluation' },
  { name: 'Kinerja', clasification: 'evaluation' },
  { name: 'Kualitas', clasification: 'evaluation' },
  { name: 'Pelanggaran Hukum', clasification: 'evaluation' },
];

export default async function category_seeder() {
  const category = await prisma.categories.createMany({
    data: categories,
  });

  console.log('seeding . . . . . ');
  console.log(category);

  return category;
}
