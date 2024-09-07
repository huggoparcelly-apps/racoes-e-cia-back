import { NextFunction, Request, Response } from "express";
import { auth } from '../../firebase/firebaseAdmin';

export const verifyToken =  async (req: Request, res: Response) => {
  const { token } = req.body.user;

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return res.status(200).json({ valid: true, decodedToken });
  } catch (error) {
    return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }
}