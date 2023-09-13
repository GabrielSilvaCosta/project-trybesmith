import { Request, Response } from 'express';
import productService from '../services/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const { name, price, orderId } = req.body;

  if (!name || !price || !orderId) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
  }

  const serviceResponse = await productService.create({ name, price, orderId });

  res.status(serviceResponse.status === 'SUCCESSFUL' ? 201 : 400).json(serviceResponse.data);
}

async function listProductsController(req: Request, res: Response) {
  try {
    const products = await productService.listProducts();

    if (products.status === 'SUCCESSFUL') {
      return res.status(200).json(products.data);
    }

    return res.status(mapStatusHTTP(products.status)).json(products.data);
  } catch (error) {
    return res.status(400).json({ message: 'erro ao carregar.' });
  }
}

export default {
  create,
  listProductsController,
};
