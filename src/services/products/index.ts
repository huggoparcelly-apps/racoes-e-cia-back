import * as createProduct from "./Create";
import * as find from "./Find";


export const ProductService = {
  ...createProduct,
  ...find,
};