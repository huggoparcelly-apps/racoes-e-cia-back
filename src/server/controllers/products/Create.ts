import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";


interface IProduct {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}


export const create = (req: Request<{},{}, IProduct>, res: Response) => {
  const data = req.body;

  return res.status(StatusCodes.CREATED).json(data);
}