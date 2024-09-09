import { Router } from 'express';

import {findAllProducts, createProduct, findProductById} from '../controllers/products/'
import validateJWT from '../middlewares/validateJWT';

const router = Router();

router.get('/', findAllProducts);
router.get('/:id', findProductById);
router.post('/', validateJWT, createProduct);

export { router as productsRouter };

