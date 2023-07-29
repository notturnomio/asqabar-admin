'use client';

import { ApiList } from '@/components/ui/apiList';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Forward, Palette, Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ColorColumn, columns } from './columns';

interface ColorsClientProps {
  data: ColorColumn[];
}

export const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {
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
          title={`Colors (${data.length})`}
          description='Manage colors for your store'
          icon={<Palette />}
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filterKey='name' />
      <Heading
        title='API'
        description='API calls for Colors'
        icon={<Forward />}
      />
      <Separator />
      <ApiList entityName='colors' entityIdName='colorId' />
    </>
  );
};
