import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductService } from "../../services/products";
import { UserService } from "../../services/users";
import { IProduct } from "../../utils/Interfaces";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { user_id } = req.body.user;

    const user = await getUser(user_id);
    const role = user.role;

    if (role != "admin") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized request" });
    }

    const product: IProduct = toProduct(data);

    const newProduct = await ProductService.createProduct(product);
    return res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    next(error);
  }
};

function toProduct(data: any): IProduct {
  return {
    name: data.name,
    description: data.description,
    category: data.category,
    price: data.price,
    quantity: data.quantity,
    image: data.image,
  };
}

async function getUser(userFirebaseId: string) {
  return await UserService.getByFirebaseId(userFirebaseId);
}

export const findAllProducts = async (_req: Request, res: Response) => {
  try {
    const allProducts = await ProductService.getAll();

    return res.status(StatusCodes.OK).json(allProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await ProductService.getById(id);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
