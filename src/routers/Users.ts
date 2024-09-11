import { Router } from "express";
import { createUser, getUserByFirebaseId } from "../controllers/users";

const router = Router();
router.post("/", createUser);
router.get('/:firebaseId', getUserByFirebaseId);

export { router as userRouter };
