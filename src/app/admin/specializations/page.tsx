import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { DataTable } from './_components/Datatable';
import { columns } from './columns';

import { Button } from '@/components/ui/button';
import db from '@/db/db';

async function getSpecializations() {
  const specializationsData = await db.specialization.findMany({
    select: {
      id: true,
      name: true,
      Veterinarians: {
        include: {
          Veterinarian: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return specializationsData.map((specialization) => ({
    id: specialization.id,
    name: specialization.name,
    Veterinarians: specialization.Veterinarians.map((v) => ({
      id: v.Veterinarian.id,
      createdAt: v.Veterinarian.createdAt,
      updatedAt: v.Veterinarian.updatedAt,
      firstName: v.Veterinarian.firstName,
      lastName: v.Veterinarian.lastName,
      email: v.Veterinarian.email,
      phone: v.Veterinarian.phone,
    })),
  }));
}

export default async function AdminSpecializationsIndex() {
  const data = await getSpecializations();
  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-semibold">Specializations</h1>
        <Button asChild>
          <Link href="/admin/specializations/details">
            <PlusCircle />
            New Specialization
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
