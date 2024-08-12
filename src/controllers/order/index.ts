import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { OrderService } from "../../services/orders";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const {user_id} = req.body.user;
    
    const newOrder = await OrderService.create(data, user_id);

    return res.status(StatusCodes.CREATED).json(newOrder);
  } catch (error) {
    next(error);
  }
};