export interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ProductDTO {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  image: string;
}