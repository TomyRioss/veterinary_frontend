'use server';

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
  const specializationData = parsedSpecializationData.data;
}
