'use client';

import { ColumnDef } from '@tanstack/react-table';

interface SubcategoriesData {
  id: number;
  name: string;
}

export const columns: ColumnDef<SubcategoriesData>[] = [
  {
    accessorKey: 'name',
    header: 'Subcategory',
  },
];
