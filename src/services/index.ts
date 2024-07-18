import * as create from "./products/Create";
import * as find from "./products/Find";

export const ProductService = {
  ...create,
  ...find,
};
