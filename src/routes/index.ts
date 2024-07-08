import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.routes";
const router = Router();
const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
