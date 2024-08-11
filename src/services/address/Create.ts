import { Address } from "@prisma/client";
import { prisma } from "../../database";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { IAddress } from "../../utils/Interfaces";

export const create = async (data: IAddress): Promise<Address> => {
  
  try {
    return await prisma.address.create({ data: { ...data } });
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestError('Unique constraint failed');
    }
    console.error(error);
    throw new InternalServerError('Could not create product');
  }
  
}