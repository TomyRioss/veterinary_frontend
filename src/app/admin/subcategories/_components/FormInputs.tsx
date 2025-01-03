'use client';

import { useState } from 'react';

import { FormInputsProps } from '../../_components/Form';

import { MultiSelect } from '@/components/custom/multiselect';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { subcategorySchema } from '@/models/subcategory';

export function FormInputs({
  error,
  categories,
}: FormInputsProps<typeof subcategorySchema>) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" />
        {error.name && <p className="text-destructive text-sm">{error.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="categories">Categories</Label>
        <MultiSelect
          options={categories || []}
          onValueChange={setSelectedCategories}
          defaultValue={selectedCategories}
          placeholder="Select categories"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
        {error.categories && (
          <p className="text-destructive text-sm">{error.categories}</p>
        )}
      </div>
    </div>
  );
}
