'use client';

import { useState } from 'react';

import { FormInputsProps } from '../../_components/Form';

import { MultiSelect, Option } from '@/components/custom/multiselect';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { subcategorySchema } from '@/models/subcategory';

export function FormInputs({
  error,
  categories: initialCategories = [],
}: FormInputsProps<typeof subcategorySchema>) {
  const [categories, setCategories] = useState<Option[]>(initialCategories);
  console.log(initialCategories);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" />
        {error.name && <p className="text-destructive text-sm">{error.name}</p>}
      </div>
      <MultiSelect options={categories} selected={[]} onChange={() => {}} />
    </>
  );
}
