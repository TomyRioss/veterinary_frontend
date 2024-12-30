'use client';

import { Veterinarian } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

interface SpecializationsData {
  id: number;
  name: string;
  Veterinarians: Veterinarian[];
}

export const columns: ColumnDef<SpecializationsData>[] = [
  {
    accessorKey: 'name',
    header: 'Specialization',
  },
];
