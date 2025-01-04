'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CheckCircle, XCircle } from 'lucide-react';

interface ProductsData {
  id: string;
  name: string;
  price: string;
  stock: string;
  isAvailable: boolean;
  brand: string;
  images: string[];
  attributes: Record<string, string>;
}

export const columns: ColumnDef<ProductsData>[] = [
  {
    accessorKey: 'isAvailable',
    header: 'Availability',
    cell: ({ row }) => {
      const isAvailable = row.getValue('isAvailable') as boolean;
      return isAvailable ? <CheckCircle /> : <XCircle />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Product',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
];
