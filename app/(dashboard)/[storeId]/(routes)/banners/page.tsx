import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { BannersClient } from './components/client';
import { BannerColumn } from './components/columns';

const BannersPage = async ({ params }: { params: { storeId: string } }) => {
  const banners = await prismadb.banner.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedBanners: BannerColumn[] = banners.map((banner) => ({
    id: banner.id,
    label: banner.label,
    createdAt: format(banner.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <BannersClient data={formattedBanners} />
    </div>
  );
};

export default BannersPage;
