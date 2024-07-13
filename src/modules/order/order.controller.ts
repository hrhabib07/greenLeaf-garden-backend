import { Request, Response } from "express";
import { OrderService } from "./order.services";

const orderService = new OrderService();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
