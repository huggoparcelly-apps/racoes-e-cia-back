import { Product } from "@prisma/client";
import { ProductDTO } from "../../utils/Interfaces";

export const toProductDTO = (product: Product): ProductDTO => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    image: product.image,
  };
};

export const toProductsDTOList = (products: Product[]): ProductDTO[] => {
  return products.map((product) => toProductDTO(product));
};
