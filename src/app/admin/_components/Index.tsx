import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AdminIndexProps {
  title: string;
  newItemHref: string;
  newItemLabel: string;
  DataTableComponent: React.ReactNode;
}

export function AdminIndexPage({
  title,
  newItemHref,
  newItemLabel,
  DataTableComponent,
}: AdminIndexProps) {
  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button asChild>
          <Link href={newItemHref}>
            <PlusCircle />
            {newItemLabel}
          </Link>
        </Button>
      </div>
      {DataTableComponent}
    </main>
  );
}
