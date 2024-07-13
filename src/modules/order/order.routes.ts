import { Router } from "express";
import { createOrder, getAllOrders, getOrderById } from "./order.controller";

const router = Router();
router.post("/create-product", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);

export const OrderRoutes = router;
