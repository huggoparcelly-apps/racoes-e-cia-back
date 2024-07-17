import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../database";

interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export const create = async (req: Request<{}, {}, IProduct>, res: Response) => {
  const data = req.body;

  try {
    const newProduct = await prisma.product.create({ data: { ...data } });
    return res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
