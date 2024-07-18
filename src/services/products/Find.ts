import { prisma } from "../../database";
import { toProductsDTOList } from "../../mappers/products";
import { ProductDTO } from "../../utils/Interfaces";

export const findAll = async (): Promise<ProductDTO[]> => {
  const allProducts = await prisma.product.findMany();

  return toProductsDTOList(allProducts);
}