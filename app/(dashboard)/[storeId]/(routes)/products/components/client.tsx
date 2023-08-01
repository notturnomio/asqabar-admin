'use client';

import { ApiList } from '@/components/ui/apiList';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Forward, Plus, Shirt } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductColumn, columns } from './columns';

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your store'
          icon={<Shirt />}
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filterKey='name' />
      <Heading
        title='API'
        description='API calls for Products'
        icon={<Forward />}
      />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  );
};
