import { Router } from "express";
import { verifyToken } from "../controllers/verifyToken";

const router = Router();
router.get('/', verifyToken)

export { router as verifyTokenRouter };