import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TProduct } from "./product.interface";
import { productServices } from "./product.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync((req: Request, res: Response) => {
  const product: TProduct = req.body;
  const result = productServices.createProductIntoDB(product);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is created successfully",
    data: result,
  });
});

export const productControllers = {
  createProduct,
};
