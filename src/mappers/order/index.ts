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

export const toOrdersDTOList = (orders: Order[], itensHashmap: Map<number, ItemDTO[]>): OrderDTO[] => {  
  return orders.map(order => toOrderDTO(order, itensHashmap.get(order.id)))
  .filter((dto) => dto !== null) as OrderDTO[];
}

export const toOrderDTO = (order: Order, itens?: ItemDTO[]): OrderDTO => {
  
  return {
    id: order.id,
    date: order.date,
    itens: itens,
    totalAmount: order.totalAmount,
    status: order.status,
    paymentType: order.paymentType
  }
}

export const toItemsDTO = (itens: OrderProduct[]): ItemDTO[] => {
  
  return itens.map((item) => toItemDTO(item));
}

export const toItemDTO = (orderPorduct: OrderProduct): ItemDTO => {
  return {
    productName: orderPorduct.productId.toString(),
    quantity: orderPorduct.quantity
  }
}