import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { CategoryServices } from "./category.services";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const Category: TCategory = req.body;
  const result = await CategoryServices.createCategoryIntoDB(Category);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is created successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const Category: Partial<TCategory> = req.body;
  const id: string = req.params.id;
  const result = await CategoryServices.updateCategoryIntoDB(id, Category);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is updated successfully",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await CategoryServices.deleteCategoryFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is deleted successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getALlCategoriesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories are retrieved successfully",
    data: result,
  });
});

const getASingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await CategoryServices.getASingleCategoryFromDB(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "The Category does not exits");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is retrieved successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  updateCategory,
  getAllCategories,
  getASingleCategory,
  deleteCategory,
};
