import { prisma } from "../../database";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { toProductDTO } from "../../mappers/products";
import { IProduct, ProductDTO } from "../../utils/Interfaces";

export const createProduct = async (data: IProduct): Promise<ProductDTO | null> => {
  
  try {
    const newProduct = await prisma.product.create({ data: { ...data } });
    return toProductDTO(newProduct);

  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestError('Unique constraint failed');
    }
    console.error(error);
    throw new InternalServerError('Could not create product');
  }
  
}