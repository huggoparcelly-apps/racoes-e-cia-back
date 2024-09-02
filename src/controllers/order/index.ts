import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { OrderService } from "../../services/orders";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const { user_id } = req.body.user;
    
    const newOrder = await OrderService.create(data, user_id);

    return res.status(StatusCodes.CREATED).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const findAllOrders = async (req: Request, res: Response) => {

  try {
    const { user_id } = req.body.user;
    const allOrders = await OrderService.getAll(user_id);
    
    return res.status(StatusCodes.OK).json(allOrders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const findOrderById = async(req: Request, res: Response) => {
  
  try {
    const { user_id } = req.body.user;
    const { id } = req.params;

    const orderId = Number(id);

    const product = await OrderService.getById(user_id, orderId);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Order not found" });
    }
    
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}