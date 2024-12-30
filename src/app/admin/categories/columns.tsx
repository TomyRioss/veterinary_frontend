'use client';

import { ColumnDef } from '@tanstack/react-table';

interface CategoriesData {
  id: number;
  name: string;
  description: string | null;
}

export const columns: ColumnDef<CategoriesData>[] = [
  {
    accessorKey: 'name',
    header: 'Category',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];
