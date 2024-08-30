import { OrderProduct } from "@prisma/client";
import { prisma } from "../../database";
import { ItemDTO, OrderDTO } from "../../utils/Interfaces";
import { UserService } from "../users";
import { toItemsDTO, toOrdersDTOList } from "../../mappers/order";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";

export const getAll = async (
  userFirebaseId: string
): Promise<OrderDTO[] | null> => {
  // buscar user
  const user = await UserService.getByFirebaseId(userFirebaseId);
  const userId = user.id;

  try {
    const allOrders = await prisma.order.findMany({
      where: { userId: userId },
    });

    // hasmap<OrderId, OrderProduct[]>
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
          const formattedItens = itens.map(item => ({
            productName: item.product.name,
            quantity: item.quantity,
          }));

          itensHashmap.set(order.id, formattedItens);
        }
      })
    );

    return toOrdersDTOList(allOrders, itensHashmap);

  } catch (error: any) {
    if (error.code === "P2002") {
      throw new BadRequestError("Unique constraint failed");
    }
    console.error(error);
    throw new InternalServerError("Could not retrieve user");
  }
};
