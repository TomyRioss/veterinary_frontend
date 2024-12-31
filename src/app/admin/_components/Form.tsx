'use client';

import { useActionState } from 'react';

import { ZodObject, ZodRawShape } from 'zod';

import { FormActions } from './FormActions';

import { Option } from '@/components/custom/multiselect';

interface FormProps<Schema extends ZodObject<ZodRawShape>> {
  cancelHref: string;
  FormInputs: React.ElementType<FormInputsProps<Schema>>;
  create: (prevState: unknown, formData: FormData) => Promise<unknown>;
}

export interface FormInputsProps<Schema extends ZodObject<ZodRawShape>> {
  error: Partial<Record<keyof Schema['shape'], string>>;
  categories?: Option[];
}

export function Form<Schema extends ZodObject<ZodRawShape>>({
  cancelHref,
  FormInputs,
  create,
}: FormProps<Schema>) {
  const [error, action] = useActionState(create, {});
  return (
    <form action={action} className="space-y-4">
      <FormInputs
        error={error as Partial<Record<keyof Schema['shape'], string>>}
      />
      <FormActions cancelHref={cancelHref} />
    </form>
  );
}
