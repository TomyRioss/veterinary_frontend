import { DataTable } from '../_components/Datatable';
import { AdminIndexPage } from '../_components/Index';
import { columns } from './columns';

import db from '@/db/db';

async function getData() {
  const data = await db.subcategory.findMany({
    select: {
      id: true,
      name: true,
      Categories: {
        select: {
          Category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  // Transform the Categories property into a simple array of category names
  const parsedData = data.map((subcategory) => ({
    id: subcategory.id,
    name: subcategory.name,
    categories: subcategory.Categories.map((cat) => cat.Category.name),
  }));

  return parsedData;
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
