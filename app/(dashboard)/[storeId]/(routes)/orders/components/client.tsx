'use client';

import { DataTable } from '@/components/ui/dataTable';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { OrderColumn, columns } from './columns';

interface OrdersClientProps {
  data: OrderColumn[];
}

export const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
        icon={<ShoppingBag />}
      />
      <Separator />
      <DataTable columns={columns} data={data} filterKey='products' />
    </>
  );
};
