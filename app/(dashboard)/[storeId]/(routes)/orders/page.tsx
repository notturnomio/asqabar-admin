import prismadb from '@/lib/prismadb';
import { priceFormatter } from '@/lib/utils';
import { format } from 'date-fns';
import { OrdersClient } from './components/client';
import { OrderColumn } from './components/columns';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    isPaid: order.isPaid,
    isDelivered: order.isDelivered,
    name: order.name,
    email: order.email,
    phone: order.phone,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: priceFormatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(order.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <OrdersClient data={formattedOrders} />
    </div>
  );
};

export default OrdersPage;
