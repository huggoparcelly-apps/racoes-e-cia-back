import { Router } from "express";
import { createOrder, findAllOrders } from "../controllers/order";

const router = Router();
router.post('/', createOrder);
router.get('/', findAllOrders);

export { router as orderRouter };