import { Request, Response } from 'express';
import productService from '../services/product.service';

async function create(req: Request, res: Response) {
  const { name, price, orderId } = req.body;

  if (!name || !price || !orderId) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
  }

  const serviceResponse = await productService.create({ name, price, orderId });

  res.status(serviceResponse.status === 'SUCCESSFUL' ? 201 : 400).json(serviceResponse.data);
}

export default {
  create,
};
