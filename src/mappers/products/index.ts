import { Product } from "@prisma/client";
import { ProductDTO } from "../../utils/Interfaces";

export const toProductDTO = (product: Product | null): ProductDTO | null => {
  if (!product) {
    return null;
  }
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    image: product.image,
  };
};

export const toProductsDTOList = (products: Product[]): ProductDTO[] | null => {
  return products
    .map((product) => toProductDTO(product))
    .filter((dto) => dto !== null) as ProductDTO[];
};
