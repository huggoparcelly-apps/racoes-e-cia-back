import { UserService } from './../users/index';
import { prisma } from "../../database";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { IOrder, OrderDTO } from "../../utils/Interfaces";
import { AddressService } from './../address/index';
import { toItemsDTO, toOrderDTO, toOrderEntity } from '../../mappers/order';
import { OrderProductService } from '../orderProduct';

export const create = async (data: IOrder, userFirebaseId: string): Promise<OrderDTO | null> => {
  
  try {
    // buscar user
    const user = await UserService.getByFirebaseId(userFirebaseId);
    const userId = user.id;
    
    // salvar endereço
    data.address.userId = userId;
    const address = await AddressService.create(data.address);

    //salvar order
    const order = toOrderEntity(data, address);
    const savedOrder = await prisma.order.create({ data: { ...order } });
    
    //salvar orderProduct
    const orderProduct = await OrderProductService.create(data, savedOrder)
    const orderDTO = toItemsDTO(orderProduct)
    return toOrderDTO(savedOrder, orderDTO);
    
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestError('Unique constraint failed');
    }
    console.error(error);
    throw new InternalServerError('Could not create product');
  }
  
}