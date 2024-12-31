'use client';

import Link from 'next/link';

import { X } from 'lucide-react';

import { SubmitButton } from './SubmitButton';

import { Button } from '@/components/ui/button';

interface FormActionsProps {
  cancelHref: string;
}

export function FormActions({ cancelHref }: FormActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-4">
      <Button variant="secondary" asChild>
        <Link href={cancelHref}>
          <X />
          Cancel
        </Link>
      </Button>
      <SubmitButton />
    </div>
  );
}
