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
router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getASingleProduct);
router.delete("/:id", productControllers.deleteProduct);
router.put("/:id", productControllers.updateProduct);

export const ProductRoutes = router;
