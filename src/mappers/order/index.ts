import { Address, Order, OrderProduct } from "@prisma/client";
import { IAddress, IOrder, ItemDTO, OrderDTO } from "../../utils/Interfaces";

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

type propsAllOrders = ({ address?: {
  id: number,
  street: string,
  number: number,
  neighborhood: string,
  complement: string | null,
  userId: number,
};} & {
id: number,
date: Date,
userId: number,
addressId: number,
totalAmount: number,
paymentType: string,
status: string,
})

export const toOrdersDTOList = (orders: propsAllOrders[], itemsHashmap: Map<number, ItemDTO[]>): OrderDTO[] => {  
  return orders.map(order => toOrderDTO(order, itemsHashmap.get(order.id)))
  .filter((dto) => dto !== null) as OrderDTO[];
}

export const toOrderDTO = (order: propsAllOrders | null, items?: ItemDTO[]): OrderDTO | null => {
  
  if (order && order.address) {
    return {
      id: order.id,
      date: order.date,
      items: items,
      totalAmount: order.totalAmount,
      status: order.status,
      paymentType: order.paymentType,
      address: {
        street: order.address.street,
        neighborhood: order.address.neighborhood,
        number: order.address.number,
        complement: order.address.complement,
        userId: order.address.userId
      }
    }
  }
  return null;
}

export const toItemsDTO = (items: OrderProduct[]): ItemDTO[] => {
  
  return items.map((item) => toItemDTO(item));
}

export const toItemDTO = (orderPorduct: OrderProduct): ItemDTO => {
  return {
    productName: orderPorduct.productId.toString(),
    quantity: orderPorduct.quantity
  }
}