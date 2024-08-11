import { Router } from "express";
import { createOrder } from "../controllers/order";

const router = Router();
router.post('/', createOrder);

export { router as orderRouter };