import * as createUser from "./Create";
import * as find from './Find';

export const UserService = {
  ...createUser,
  ...find,
}