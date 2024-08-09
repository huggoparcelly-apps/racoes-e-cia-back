import { prisma } from "../../database";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { toUserDTO } from "../../mappers/users";
import { UserDTO } from "../../utils/Interfaces";

export const getByFirebaseId = async (id: string): Promise<UserDTO | null> => {
  
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseId: id },
    });
    return toUserDTO(user);  

  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestError('Unique constraint failed');
    }
    console.error(error);
    throw new InternalServerError('Could not retrieve user');
  }
  
}