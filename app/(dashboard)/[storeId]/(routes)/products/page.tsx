import prismadb from '@/lib/prismadb';
import { priceFormatter } from '@/lib/utils';
import { format } from 'date-fns';
import { ProductsClient } from './components/client';
import { ProductColumn } from './components/columns';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: priceFormatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    createdAt: format(product.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <ProductsClient data={formattedProducts} />
    </div>
  );
};

export default ProductsPage;
