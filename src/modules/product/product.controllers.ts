import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TProduct, TProductQuery } from "./product.interface";
import { productServices } from "./product.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product: TProduct = req.body;
  const result = await productServices.createProductIntoDB(product);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is created successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const product: Partial<TProduct> = req.body;
  const id: string = req.params.id;
  const result = await productServices.updateProductIntoDB(id, product);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is updated successfully",
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await productServices.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is deleted successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as unknown as TProductQuery;
  const result = await productServices.getALlProductsFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are retrieved successfully",
    data: result,
  });
});

const getASingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await productServices.getASingleProductFromDB(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "The product does not exits");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved successfully",
    data: result,
  });
});

export const productControllers = {
  createProduct,
  updateProduct,
  getAllProducts,
  getASingleProduct,
  deleteProduct,
};
