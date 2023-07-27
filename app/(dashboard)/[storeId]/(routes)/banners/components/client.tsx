'use client';

import { ApiList } from '@/components/ui/apiList';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Forward, Image as ImageIcon, Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BannerColumn, columns } from './columns';

interface BannerClientProps {
  data: BannerColumn[];
}

export const BannerClient: React.FC<BannerClientProps> = ({ data }) => {
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
          title={`Banners (${data.length})`}
          description='Manage banners for your store'
          icon={<ImageIcon />}
        />
        <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filterKey='label' />
      <Heading
        title='API'
        description='API calls for Banners'
        icon={<Forward />}
      />
      <Separator />
      <ApiList entityName='banners' entityIdName='bannerId' />
    </>
  );
};
