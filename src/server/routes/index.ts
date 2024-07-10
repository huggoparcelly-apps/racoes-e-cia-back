import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProductController } from './../controllers'

const router = Router();

router.get('/', (req, res) => {

  return res.status(StatusCodes.ACCEPTED).json('Hello world!');
});

router.post('/products', ProductController.create);

export {router}

