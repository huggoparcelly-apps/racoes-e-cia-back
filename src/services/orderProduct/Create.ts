import { Order, OrderProduct } from "@prisma/client";
import { IOrder } from "../../utils/Interfaces";
import { prisma } from "../../database";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { toOrderProductEntities } from "../../mappers/orderProduct";

export const create = async (data: IOrder, savedOrder: Order): Promise<OrderProduct[]> => {
  
  try {

    const orderProducts = toOrderProductEntities(data, savedOrder)
    
    return await prisma.orderProduct.createManyAndReturn({ data: orderProducts });
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestError('Unique constraint failed');
    }
    console.error(error);
    throw new InternalServerError('Could not create product');
  }
  
}