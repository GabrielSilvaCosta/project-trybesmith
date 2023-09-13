import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse, ServiceResponseErrorType } from '../types/ServiceResponse';

async function create(product: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  const newProduct = await ProductModel.create(product);

  return {
    status: 'SUCCESSFUL',
    data: newProduct.dataValues,
  };
}

async function listProducts(): Promise<ServiceResponse<Product[]>> {
  try {
    const products = await ProductModel.findAll();
    const productData = products.map((product) => product.toJSON() as Product);

    return {
      status: 'SUCCESSFUL',
      data: productData,
    };
  } catch (error) {
    return {
      status: 'INTERNAL_ERROR' as ServiceResponseErrorType,
      data: { message: 'Erro ao listar os produtos.' },
    };
  }
}

export default { 
  create,
  listProducts,
};
