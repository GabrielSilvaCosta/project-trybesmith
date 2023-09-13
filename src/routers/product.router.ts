import express from 'express';
import ProductController from '../controllers/product.controler';
import nameValidations from '../middlewares/productName.validations';
import priceValidations from '../middlewares/productPrice.validations';

const router = express.Router();

router.post('/', nameValidations, priceValidations, ProductController.create);
router.get('/', ProductController.listProductsController);

export default router;
