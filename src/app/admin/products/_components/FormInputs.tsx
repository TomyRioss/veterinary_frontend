'use client';

import { useEffect, useState } from 'react';

import { Subcategory } from '@prisma/client';

import { FormInputsProps } from '../../_components/Form';

import { MultiSelect } from '@/components/custom/multiselect';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { subcategorySchema } from '@/models/subcategory';

export function FormInputs({
  error,
  categories,
}: FormInputsProps<typeof subcategorySchema>) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await fetch('/api/subcategories');
      const data = await response.json();
      setSubcategories(data);
    };
    fetchSubcategories();
  }, []);
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
          name="categories"
          options={categories || []}
          onValueChange={setSelectedCategories}
          defaultValue={selectedCategories}
          placeholder="Select categories"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="categories">Subcategory</Label>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {subcategories.map((subcategory) => (
                <CommandItem key={subcategory.id}>
                  {subcategory.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {error.categories && (
          <p className="text-destructive text-sm">{error.categories}</p>
        )}
      </div>
      <input type="hidden" name="categories" value={selectedCategories} />
    </div>
  );
}
