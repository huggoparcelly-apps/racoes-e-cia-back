
import { prisma } from "../../database";
import { toProductDTO, toProductsDTOList } from "../../mappers/products";
import { ProductDTO } from "../../utils/Interfaces";

export const getAll = async (): Promise<ProductDTO[] | null> => {
  const allProducts = await prisma.product.findMany();

  return toProductsDTOList(allProducts);
}

export const getById = async (id: string): Promise<ProductDTO | null> => {
  
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
  });

  return toProductDTO(product);
}