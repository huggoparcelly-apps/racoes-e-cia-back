import { getAll } from './../../services/products/Find';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductService } from "../../services";
import { IProduct } from "../../utils/Interfaces";

export const createProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
  const data = req.body;

  try {
    
    const newProduct = await ProductService.create(data);
    return res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findAllProducts = async (_req: Request, res: Response) => {

  try {
    const allProducts = await ProductService.getAll();
    
    return res.status(StatusCodes.OK).json(allProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findProductById = async(req: Request, res: Response) => {
  
  try {
    const { id } = req.params;

    const product = await ProductService.getById(id);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    }
    
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}