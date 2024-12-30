'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { X } from 'lucide-react';

import { create } from '../_actions/create';
import { SubmitButton } from './SubmitButton';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SpecializationsForm() {
  const [error, action] = useActionState(create, {});
  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" />
        {error.name && <p className="text-destructive">{error.name}</p>}
      </div>
      <div className="flex items-center justify-end space-x-4">
        <Button variant={'secondary'} asChild>
          <Link href="/admin/specializations">
            <X />
            Cancel
          </Link>
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
