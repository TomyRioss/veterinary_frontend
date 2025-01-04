'use client';

import { Form } from '../../_components/Form';
import { create } from '../_actions/create';
import { FormInputs } from './FormInputs';

import { Option as OptionType } from '@/components/custom/multiselect';
import { subcategorySchema } from '@/models/subcategory';

export function SubcategoriesForm({
  categories,
}: {
  categories: OptionType[];
}) {
  return (
    <Form<typeof subcategorySchema>
      cancelHref="/admin/subcategories"
      FormInputs={(props) => <FormInputs {...props} categories={categories} />}
      create={create}
    />
  );
}
