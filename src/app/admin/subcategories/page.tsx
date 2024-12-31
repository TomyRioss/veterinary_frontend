import { DataTable } from '../_components/Datatable';
import { AdminIndexPage } from '../_components/Index';
import { columns } from './columns';

import db from '@/db/db';

async function getData() {
  const data = await db.subcategory.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return data;
}

export default async function AdminSubcategoriesIndex() {
  const subcategories = await getData();

  return (
    <AdminIndexPage
      title="Subcategories"
      newItemHref="/admin/subcategories/details"
      newItemLabel="New Subcategory"
      DataTableComponent={<DataTable columns={columns} data={subcategories} />}
    />
  );
}
