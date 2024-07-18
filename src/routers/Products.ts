import { Router } from 'express';

import {findAll, create} from '../controllers/products/'

const router = Router();

router.get('/', findAll);

router.post('/', create);

export { router as productsRouter };

