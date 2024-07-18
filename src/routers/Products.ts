import { Router } from 'express';

import {findAllProducts, createProduct, findProductById} from '../controllers/products/'

const router = Router();

router.get('/', findAllProducts);
router.get('/:id', findProductById);
router.post('/', createProduct);

export { router as productsRouter };

