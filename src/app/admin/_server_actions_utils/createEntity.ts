import { redirect } from 'next/navigation';

type Schema = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  safeParse: (data: Record<string, any>) => {
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
  };
};

type EntityCreateArgs = {
  schema: Schema;
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dbCreate: (data: any) => Promise<any>;
  redirectUrl: string;
};

export async function createEntity({
  schema,
  formData,
  dbCreate,
  redirectUrl,
}: EntityCreateArgs) {
  const parsedData = schema.safeParse(Object.fromEntries(formData.entries()));
  console.log(parsedData);
  if (!parsedData.success) {
    return parsedData.error.formErrors.fieldErrors;
  }

  await dbCreate(parsedData.data);
  redirect(redirectUrl);
}
