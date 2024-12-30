'use client';

import { ColumnDef } from '@tanstack/react-table';

interface BrandsData {
  id: number;
  name: string;
}

export const columns: ColumnDef<BrandsData>[] = [
  {
    accessorKey: 'name',
    header: 'Brand',
  },
];
