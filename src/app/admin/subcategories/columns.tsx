'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SubcategoriesData {
  id: number;
  name: string;
  categories: string[];
}

const MAX_VISIBLE_CATEGORIES = 3;

const CategoriesCell: React.FC<{ categories: string[] }> = ({ categories }) => {
  console.log(categories, 'categories');
  const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const remainingCount = categories.length - MAX_VISIBLE_CATEGORIES;

  return (
    <div className="flex flex-wrap gap-1">
      {visibleCategories.map((category, index) => (
        <span
          key={index}
          className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
        >
          {category}
        </span>
      ))}
      {remainingCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 cursor-help">
                +{remainingCount} more
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{categories.slice(MAX_VISIBLE_CATEGORIES).join(', ')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export const columns: ColumnDef<SubcategoriesData>[] = [
  {
    accessorKey: 'name',
    header: 'Subcategory',
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ row }) => {
      const categories = row.getValue('categories') as string[];
      return <CategoriesCell categories={categories} />;
    },
  },
];
