import * as create from "./Create";
import * as find from "./Find";
import * as update from "./Update";

export const OrderService = {
  ...create,
  ...find,
  ...update
}