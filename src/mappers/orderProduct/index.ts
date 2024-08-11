import { Order, OrderProduct } from "@prisma/client";
import { InterItem, IOrder } from "../../utils/Interfaces";

export const toOrderProductEntity = (item: InterItem, savedOrder: Order): OrderProduct => {
  
  return {
    orderId: savedOrder.id,
    productId: item.productId,
    quantity: item.quantity,
  };
};

export const toOrderProductEntities = (data: IOrder, savedOrder: Order): OrderProduct[] => {
  return data.itens.map((item) => toOrderProductEntity(item, savedOrder));
}