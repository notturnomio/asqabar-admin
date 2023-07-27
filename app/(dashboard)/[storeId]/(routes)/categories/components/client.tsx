'use client';

import { ApiList } from '@/components/ui/apiList';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Forward, ListTree, Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CategoryColumn, columns } from './columns';

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
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
          title={`Categories (${data.length})`}
          description='Manage categories for your store'
          icon={<ListTree />}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filterKey='name' />
      <Heading
        title='API'
        description='API calls for Categories'
        icon={<Forward />}
      />
      <Separator />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  );
};
