'use server';

import { redirect } from 'next/navigation';

import db from '@/db/db';
import { specializationSchema } from '@/models/specialization';

export async function create(prevState: unknown, formData: FormData) {
  const parsedData = specializationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    return parsedData.error.formErrors.fieldErrors;
  }

  await db.specialization.create({
    data: parsedData.data,
  });

  redirect('/admin/specializations');
}
