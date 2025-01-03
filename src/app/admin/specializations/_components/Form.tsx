'use client';

import { useActionState } from 'react';

import { FormActions } from '../../_components/FormActions';
import { create } from '../_actions/create';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SpecializationsForm() {
  const [error, action] = useActionState(create, {});
  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" />
        {error.name && <p className="text-destructive text-sm">{error.name}</p>}
      </div>
      <FormActions cancelHref="/admin/specializations" />
    </form>
  );
}
