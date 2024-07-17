import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProductController } from './../controllers'

const router = Router();

router.get('/products', (req, res) => {

  return res.status(StatusCodes.ACCEPTED).json('All products');
});

router.post('/products', ProductController.create);

export {router}

