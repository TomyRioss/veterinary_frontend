'use client';

import { Form } from '../../_components/Form';
import { create } from '../_actions/create';
import { FormInputs } from './FormInputs';

export function SubcategoriesForm() {
  return (
    <Form
      cancelHref="/admin/subcategories"
      FormInputs={FormInputs}
      create={create}
    />
  );
}
