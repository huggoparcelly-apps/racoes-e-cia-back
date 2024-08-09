export interface IProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ProductDTO {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  price: number | null;
  image: string;
}

export interface IUser {
  name: string;
  email: string;
  firebaseId: string;
  role: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  firebaseId: string;
  role: string;
}