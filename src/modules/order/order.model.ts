import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const ProductDataSchema: Schema = new Schema({
  id: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  order: { type: [ProductDataSchema], required: true },
});

// 3. Create a Model.
const Order = model<TOrder>("Order", OrderSchema);
export default Order;
