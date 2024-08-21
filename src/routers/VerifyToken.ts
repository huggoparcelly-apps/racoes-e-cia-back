import { Router } from "express";
import { verifyToken } from "../controllers/verifyToken";

const router = Router();
router.post('/', verifyToken)

export { router as verifyTokenRouter };