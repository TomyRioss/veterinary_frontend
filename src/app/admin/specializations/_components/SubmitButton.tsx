'use client';

import { useFormStatus } from 'react-dom';

import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin" /> {'Saving...'}
        </>
      ) : (
        <>
          <Save /> {'Save'}
        </>
      )}
    </Button>
  );
}
