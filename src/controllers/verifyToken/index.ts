import { NextFunction, Request, Response } from "express";
import { auth } from '../../firebase/firebaseAdmin';
import { UserService } from "../../services/users";

export const verifyToken =  async (req: Request, res: Response) => {
  const { user_id, token } = req.body.user;

  try {
    const user = await getUser(user_id);
    const role = user.role;

    const decodedToken = await auth.verifyIdToken(token);
    return res.status(200).json({ valid: true, decodedToken, role });
  } catch (error) {
    return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }
}

async function getUser(userFirebaseId: string) {
  return await UserService.getByFirebaseId(userFirebaseId);
}