'use client';

import { Form } from '../../_components/Form';
import { create } from '../_actions/create';
import { FormInputs } from './FormInputs';

export function CategoriesForm() {
  return (
    <Form
      cancelHref="/admin/categories"
      FormInputs={FormInputs}
      create={create}
    />
  );
}
