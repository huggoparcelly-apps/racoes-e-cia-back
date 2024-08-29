import { Router } from "express";
import { createOrder } from "../controllers/order";

const router = Router();
router.post('/:userFirebaseId', createOrder);

export { router as orderRouter };