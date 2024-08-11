import { prisma } from "../../database";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { NotFoundError } from "../../errors/NotFoundError";
import { toUserDTO } from "../../mappers/users";
import { UserDTO } from "../../utils/Interfaces";

export const getByFirebaseId = async (id: string): Promise<UserDTO> => {
  
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseId: id },
    });
    if(user) {
      return toUserDTO(user);
    }
    
    throw new NotFoundError('User not found');
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestError('Unique constraint failed');
    }
    console.error(error);
    throw new InternalServerError('Could not retrieve user');
  }
  
}