import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { OrderService } from "../../services/orders";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const token = req.headers.authorization?.split("Bearer ")[1];
    
    // const newOrder = await OrderService.create(data);
    const newOrder = {token: token};

    return res.status(StatusCodes.CREATED).json(newOrder);
  } catch (error) {
    next(error);
  }
};