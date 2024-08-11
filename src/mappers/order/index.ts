import { Address, Order, OrderProduct } from "@prisma/client";
import { IOrder, ItemDTO, OrderDTO } from "../../utils/Interfaces";

export const toOrderEntity = (order: IOrder, address: Address): Order => {
  
  return {
    id: 0,
    date: new Date(order.date),
    userId: address.userId,
    addressId: address.id,
    totalAmount: order.totalAmount,
    paymentType: order.paymentType,
    status: order.status
  };
};

export const toOrderDTO = (order: Order, itens: OrderProduct[]): OrderDTO => {
  
  return {
    id: order.id,
    date: order.date.toDateString(),
    itens: toItemsDTO(itens),
    totalAmount: order.totalAmount,
    status: order.status,
    paymentType: order.paymentType
  }
}

const toItemsDTO = (itens: OrderProduct[]): ItemDTO[] => {
  return itens.map((item) => toItemDTO(item));
}

const toItemDTO = (orderPorduct: OrderProduct): ItemDTO => {
  return {
    product: orderPorduct.productId.toString(),
    quantity: orderPorduct.quantity
  }
}