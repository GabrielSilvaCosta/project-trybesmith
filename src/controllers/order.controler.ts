import { Request, Response } from 'express';
import orderService from '../services/order.service';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

async function allOrdersWithProducts(_req: Request, res: Response) {
  const serviceResponse = await orderService.allOrdersWithProducts() as ServiceResponse<Order[]>;

  if (serviceResponse.status === 'SUCCESSFUL') {
    return res.status(200).json(serviceResponse.data);
  } 

  return res.status(500).json({ message: 'Erro ao listar os pedidos com produtos.' });
}

export default {
  allOrdersWithProducts,
};
