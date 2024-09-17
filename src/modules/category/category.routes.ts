import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidation } from "./category.valdation";
import { CategoryControllers } from "./category.controller";

const router = Router();
router.post(
  "/create-category",
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory
);
router.get("/", CategoryControllers.getAllCategories);
router.get("/:id", CategoryControllers.getASingleCategory);
router.delete("/:id", CategoryControllers.deleteCategory);
router.put("/:id", CategoryControllers.updateCategory);

export const CategoryRoutes = router;
