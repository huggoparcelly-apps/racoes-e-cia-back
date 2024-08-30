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

export interface IOrder {
  date: Date; 
  address: IAddress; 
  itens: InterItem[];
  totalAmount: number;
  status: string;
  paymentType: string;
}

export interface OrderDTO {
  id: number;
  date: Date; 
  itens?: ItemDTO[] | null;
  totalAmount: number;
  status: string;
  paymentType: string;
}

export interface IAddress {
  street: string;
  number: number;
  neighborhood: string;
  complement: string | null;
  userId: number;
}

export interface InterItem {
  productId: number;
  quantity: number;
}

export interface ItemDTO {
  productName: string;
  quantity: number;
}
