import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/categoryForm';

const CategoryPage = async ({
  params,
}: {
  params: {
    storeId: string;
    categoryId: string;
  };
}) => {
  const category = await prismadb.category.findUnique({
    where: { id: params.categoryId },
  });
  const banners = await prismadb.banner.findMany({
    where: { storeId: params.storeId },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={category} banners={banners} />
      </div>
    </div>
  );
};

export default CategoryPage;
