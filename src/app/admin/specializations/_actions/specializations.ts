'use server';

import { redirect } from 'next/navigation';

import db from '@/db/db';
import { specializationSchema } from '@/models/specialization';

export async function addSpecialization(formData: FormData) {
  const parsedSpecializationData = specializationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  console.log(formData, 'formData');
  console.log(parsedSpecializationData, 'specializationData');
  if (!parsedSpecializationData.success) {
    return parsedSpecializationData.error.formErrors.fieldErrors;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...specializationData } = parsedSpecializationData.data;

  await db.specialization.create({
    data: specializationData,
  });

  redirect('/admin/specializations');
}
