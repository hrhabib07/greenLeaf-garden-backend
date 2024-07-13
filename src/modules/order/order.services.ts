import Order from "./order.model";
import { TOrder } from "./order.interface";
import { OrderSchema } from "./order.validation";

export class OrderService {
  // Create a new order
  async createOrder(orderData: unknown): Promise<TOrder> {
    // Validate the order data using Zod
    const validOrderData = OrderSchema.parse(orderData);

    // Create a new order instance
    const newOrder = new Order(validOrderData);

    // Save the order to the database
    return await newOrder.save();
  }

  // Get all orders
  async getAllOrders(): Promise<TOrder[]> {
    return await Order.find();
  }

  // Get a single order by ID
  async getOrderById(orderId: string): Promise<TOrder | null> {
    return await Order.findById(orderId);
  }
}
