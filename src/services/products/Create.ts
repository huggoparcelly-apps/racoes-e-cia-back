import { prisma } from "../../database";
import { toProductDTO } from "../../mappers/products";
import { IProduct, ProductDTO } from "../../utils/Interfaces";

export const create = async (data: IProduct): Promise<ProductDTO> => {
  const newProduct = await prisma.product.create({ data: { ...data } });
  
  return toProductDTO(newProduct);
}