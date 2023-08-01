'use client';

import { Button } from '@/components/ui/button';
import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { CellAction } from './cellAction';

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  size: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

const columnHeaderButton = (name: string, column: Column<ProductColumn>) => {
  return (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {name}
      <ArrowUpDown className='ml-2 h-4 w-4' />
    </Button>
  );
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => columnHeaderButton('Name', column),
  },
  {
    accessorKey: 'isArchived',
    header: ({ column }) => columnHeaderButton('Archived', column),
  },
  {
    accessorKey: 'isFeatured',
    header: ({ column }) => columnHeaderButton('Featured', column),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => columnHeaderButton('Price', column),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => columnHeaderButton('Category', column),
  },
  {
    accessorKey: 'size',
    header: ({ column }) => columnHeaderButton('Size', column),
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        <div
          className='h-6 w-6 rounded-full border'
          style={{ backgroundColor: row.original.color }}
        />
        {row.original.color}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
