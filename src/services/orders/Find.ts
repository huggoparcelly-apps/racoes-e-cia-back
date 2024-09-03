import { OrderProduct } from "@prisma/client";
import { prisma } from "../../database";
import { ItemDTO, OrderDTO } from "../../utils/Interfaces";
import { UserService } from "../users";
import { toItemsDTO, toOrderDTO, toOrdersDTOList } from "../../mappers/order";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";

export const getAll = async (userFirebaseId: string): Promise<OrderDTO[] | null> => {
  // buscar user
  const userId = await getUserId(userFirebaseId);

  try {
    const allOrders = await prisma.order.findMany({
      where: { userId: userId },
      include: {
        address: true
      }
    });
  

    const itensHashmap = new Map<number, ItemDTO[]>();

    await Promise.all(
      allOrders.map(async (order) => {
        const itens = await prisma.orderProduct.findMany({
          where: { orderId: order.id },
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        });

        if (itens.length !== 0) {
          const formattedItens = itens.map((item) => ({
            productName: item.product.name,
            quantity: item.quantity,
          }));

          itensHashmap.set(order.id, formattedItens);
        }
      })
    );

    const orders = toOrdersDTOList(allOrders, itensHashmap)
    
    return getSortedOrders(orders);
    
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new BadRequestError("Unique constraint failed");
    }
    console.error(error);
    throw new InternalServerError("Could not retrieve user");
  }
};

export const getById = async (userFirebaseId: string, id: number): Promise<OrderDTO | null> => {
  try {
    const userId = await getUserId(userFirebaseId);

    const order = await prisma.order.findUnique({
      where: { id: id, userId: userId },
      include: {
        address: true
      }
    });

    const itens = await prisma.orderProduct.findMany({
      where: { orderId: id },
      include: {
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    let formattedItens = getFormattedItens(itens);

    return toOrderDTO(order, formattedItens);
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new BadRequestError("Unique constraint failed");
    }
    console.error(error);
    throw new InternalServerError("Could not retrieve user");
  }
};

function getSortedOrders(orders: OrderDTO[]): OrderDTO[] {
  const statusOrder = ['Aguardando', 'Separacao', 'Saiu para entrega', 'Entregue', 'Cancelado'];
  return orders.sort((a, b) => {
    const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);

    if (statusComparison !== 0) {
      return statusComparison;
    }
    return b.date.getTime() - a.date.getTime();
  });
}

function getFormattedItens(itens: ({ product: { name: string; price: number | null }; } & { productId: number; orderId: number; quantity: number; })[]) {
  let formattedItens = undefined;

  if (itens.length !== 0) {
    formattedItens = itens.map((item) => ({
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      
    }));
  }
  return formattedItens;
}

async function getUserId(userFirebaseId: string) {
  const user = await UserService.getByFirebaseId(userFirebaseId);
  const userId = user.id;
  return userId;
}
