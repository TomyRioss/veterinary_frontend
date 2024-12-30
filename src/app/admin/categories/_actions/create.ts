'use server';

import { createEntity } from '../../_server_actions_utils/createEntity';

import db from '@/db/db';

export async function create(prevState: unknown, formData: FormData) {
  return createEntity({
    schema: (await import('@/models/category')).categorySchema,
    formData,
    dbCreate: (data) => db.category.create({ data }),
    redirectUrl: '/admin/categories',
  });
}
