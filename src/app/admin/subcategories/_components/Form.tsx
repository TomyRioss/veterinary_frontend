'use client';

import { Form } from '../../_components/Form';
import { create } from '../_actions/create';
import { FormInputs } from './FormInputs';

import { Option } from '@/components/custom/multiselect';
import { subcategorySchema } from '@/models/subcategory';

export function SubcategoriesForm(props: { categories: Option[] }) {
  return (
    <Form<typeof subcategorySchema>
      cancelHref="/admin/subcategories"
      FormInputs={(props) => <FormInputs {...props} categories={[]} />}
      create={create}
    />
  );
}
