import { DataTable } from '../_components/Datatable';
import { AdminIndexPage } from '../_components/Index';
import { columns } from './columns';

import db from '@/db/db';

async function getData() {
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
  const data = await getData();
  return (
    <AdminIndexPage
      title="Specializations"
      newItemHref="/admin/specializations/details"
      newItemLabel="New Specialization"
      DataTableComponent={<DataTable columns={columns} data={data} />}
    />
  );
}
