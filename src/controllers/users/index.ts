import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { UserService } from "../../services/users";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const newUser = await UserService.createUser(data);
    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUserByFirebaseId = async(req: Request, res: Response) => {
  
  try {
    const { firebaseId } = req.params;

    const user = await UserService.getByFirebaseId(firebaseId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }
    
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}