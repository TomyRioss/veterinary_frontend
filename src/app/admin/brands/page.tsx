import { DataTable } from '../_components/Datatable';
import { AdminIndexPage } from '../_components/Index';
import { columns } from './columns';

import db from '@/db/db';

async function getData() {
  const data = await db.brand.findMany({
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

export default async function AdminBrandsIndex() {
  const data = await getData();
  return (
    <AdminIndexPage
      title="Brands"
      newItemHref="/admin/brands/details"
      newItemLabel="New Brand"
      DataTableComponent={<DataTable columns={columns} data={data} />}
    />
  );
}
