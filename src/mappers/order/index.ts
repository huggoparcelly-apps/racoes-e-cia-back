import { Address, Order, OrderProduct } from "@prisma/client";
import { IOrder, ItemDTO, OrderDTO } from "../../utils/Interfaces";

export const toOrderEntity = (order: IOrder, address: Address): Omit<Order, 'id'> => {
  
  return {
    date: new Date(order.date),
    userId: address.userId,
    addressId: address.id,
    totalAmount: order.totalAmount,
    paymentType: order.paymentType,
    status: order.status
  };
};

export const toOrderDTO = (order: Order, itens?: OrderProduct[]): OrderDTO => {
  
  return {
    id: order.id,
    date: order.date,
    itens: toItemsDTO(itens),
    totalAmount: order.totalAmount,
    status: order.status,
    paymentType: order.paymentType
  }
}

export const toOrdersDTOList = (orders: Order[], itensHashmap: Map<number, OrderProduct[]>): OrderDTO[] => {
  return orders.map(order => toOrderDTO(order, itensHashmap.get(order.id)))
  .filter((dto) => dto !== null) as OrderDTO[];
}

const toItemsDTO = (itens?: OrderProduct[]): ItemDTO[] | null=> {
  if(itens) {
    return itens.map((item) => toItemDTO(item));
  }
  return null;
}

const toItemDTO = (orderPorduct: OrderProduct): ItemDTO => {
  return {
    product: orderPorduct.productId.toString(),
    quantity: orderPorduct.quantity
  }
}