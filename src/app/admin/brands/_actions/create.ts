'use server';

import { redirect } from 'next/navigation';

import db from '@/db/db';
import { brandSchema } from '@/models/brand';

export async function create(prevState: unknown, formData: FormData) {
  const parsedData = brandSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    return parsedData.error.formErrors.fieldErrors;
  }

  await db.brand.create({
    data: parsedData.data,
  });

  redirect('/admin/brands');
}
