import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";
import { productControllers } from "./product.controllers";

const router = Router();
router.post(
  "/create-product",
  validateRequest(productValidation.createProductValidationSchema),
  productControllers.createProduct
);

export const ProductRoutes = router;
