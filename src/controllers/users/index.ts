import { getByFirebaseId } from './../../services/users/Find';
import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/users";
import { StatusCodes } from 'http-status-codes';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const newUser = await UserService.create(data);
    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUserByFirebaseId = async(req: Request, res: Response) => {
  
  try {
    const { firebaseId } = req.params;

    const product = await UserService.getByFirebaseId(firebaseId);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    }
    
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}