import { ZodObject, ZodRawShape } from 'zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { subcategorySchema } from '@/models/subcategory';

interface FormInputsProps<Schema extends ZodObject<ZodRawShape>> {
  error: Partial<Record<keyof Schema['shape'], string>>;
}

export function FormInputs({
  error,
}: FormInputsProps<typeof subcategorySchema>) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" />
        {error.name && <p className="text-destructive text-sm">{error.name}</p>}
      </div>
    </>
  );
}
