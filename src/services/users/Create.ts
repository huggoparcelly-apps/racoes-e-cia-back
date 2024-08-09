import { prisma } from "../../database";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { toUserDTO } from "../../mappers/users";
import { IUser, UserDTO } from "../../utils/Interfaces";

export const create = async (data: IUser): Promise<UserDTO | null> => {
  
  try {
    data.role = 'user'
    const newUser = await prisma.user.create({ data: { ...data } });
    return toUserDTO(newUser);

  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestError('Unique constraint failed');
    }
    console.error(error);
    throw new InternalServerError('Could not create product');
  }
  
}