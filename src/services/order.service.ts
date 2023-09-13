import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

async function allOrdersWithProducts(): Promise<unknown> {
  const allOrders = await OrderModel.findAll({ include: [
    { model: ProductModel,
      as: 'productIds', 
      attributes: { exclude: 
    ['name', 'price', 'orderId'] },
    
    }], 
  });
  const ordersData = allOrders.map((element) => element.dataValues);
  const corretOrdens = ordersData.map((order) => ({
    id: order.id,
    userId: order.userId,
    productIds: order.productIds?.map((product) => product.id),
  }));
  return { status: 'SUCCESSFUL', data: corretOrdens };
}

export default {
  allOrdersWithProducts,
};