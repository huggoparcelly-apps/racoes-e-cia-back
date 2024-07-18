import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductService } from "../../services";
import { IProduct } from "../../utils/Interfaces";

export const create = async (req: Request<{}, {}, IProduct>, res: Response) => {
  const data = req.body;

  try {
    
    const newProduct = await ProductService.create(data);
    return res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findAll = async (_req: Request, res: Response) => {

  try {
    const allProducts = await ProductService.findAll();
    
    return res.status(StatusCodes.OK).json(allProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};