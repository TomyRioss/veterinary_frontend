import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AdminSpecializationsIndex() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold">Specializations</h1>
        <Button asChild>
          <Link href="/admin/specializations/details">
            <PlusCircle />
            New Specialization
          </Link>
        </Button>
      </div>
    </>
  );
}
