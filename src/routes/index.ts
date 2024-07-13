import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";
const router = Router();
const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
