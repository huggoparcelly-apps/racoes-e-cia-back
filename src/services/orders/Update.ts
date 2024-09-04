import { prisma } from "../../database";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { toOrderDTO } from "../../mappers/order";
import { OrderDTO } from "../../utils/Interfaces";

export const updateOrderStatus = async (orderId: number, status: string): Promise<OrderDTO | null> => {

  try {
    
    const updatedOrder = await prisma.order.update({
      where: {id: orderId},
      data: {status: status},
    });    
    
    return toOrderDTO(updatedOrder);
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestError('Unique constraint failed');
    }
    console.error(error);
    throw new InternalServerError('Could not update order status');
  }
}