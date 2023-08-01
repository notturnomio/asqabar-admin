'use client';

import { Button } from '@/components/ui/button';
import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export type OrderColumn = {
  id: string;
  isPaid: boolean;
  isDelivered: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
};

const columnHeaderButton = (name: string, column: Column<OrderColumn>) => {
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

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: ({ column }) => columnHeaderButton('Products', column),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => columnHeaderButton('Email', column),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => columnHeaderButton('Total Price', column),
  },
  {
    accessorKey: 'isPaid',
    header: ({ column }) => columnHeaderButton('Paid', column),
  },
  {
    accessorKey: 'isDelivered',
    header: ({ column }) => columnHeaderButton('Delivered', column),
  },
];
