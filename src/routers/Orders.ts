import { Router } from "express";
import { createOrder, findAllAdminOrders, findAllOrders, findOrderById } from "../controllers/order";

const router = Router();
router.post('/', createOrder);
router.get('/', findAllOrders);
router.get('/admin', findAllAdminOrders);
router.get('/:id', findOrderById);

export { router as orderRouter };