import { DataTable } from '../_components/Datatable';
import { AdminIndexPage } from '../_components/Index';
import { columns } from './columns';

import db from '@/db/db';

async function getData() {
  const data = await db.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return data;
}

export default async function AdminSpecializationsIndex() {
  const data = await getData();
  return (
    <AdminIndexPage
      title="Categories"
      newItemHref="/admin/categories/details"
      newItemLabel="New Category"
      DataTableComponent={<DataTable columns={columns} data={data} />}
    />
  );
}
