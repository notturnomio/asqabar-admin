import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { CategoriesClient } from './components/client';
import { CategoryColumn } from './components/columns';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: { banner: true },
    orderBy: { createdAt: 'desc' },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    bannerLabel: category.banner.label,
    createdAt: format(category.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <CategoriesClient data={formattedCategories} />
    </div>
  );
};

export default CategoriesPage;
