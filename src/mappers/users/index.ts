
import { User } from "@prisma/client";
import { UserDTO } from "../../utils/Interfaces";

export const toUserDTO = (user: User | null): UserDTO | null => {
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    firebaseId: user.firebaseId,
    role: user.role
  };
};