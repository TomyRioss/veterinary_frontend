'use server';

import { createEntity } from '../../_server_actions_utils/createEntity';

import db from '@/db/db';

export async function create(prevState: unknown, formData: FormData) {
  const name = formData.get('name') as string;
  const categories = formData.get('categories') as string;
  const categoriesIds = categories.split(',');

  console.log({ name, categoriesIds }); // Debugging output

  return createEntity({
    schema: (await import('@/models/subcategory')).subcategoryFormSchema,
    formData,
    dbCreate: (data) =>
      db.subcategory.create({
        data: {
          name: data.name,
          organizationId: 1,
          Categories: {
            create: categoriesIds.map((categoryId) => ({ categoryId })),
          },
        },
      }),
    redirectUrl: '/admin/subcategories',
  });
}
