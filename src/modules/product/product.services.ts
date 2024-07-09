import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import Product from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};
const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  // check if the product is deleted
  const isProductExist = await Product.findOne({ _id: id, isDeleted: false });
  if (!isProductExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "This product does not exists");
  }

  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id, {
    isDeleted: true,
    new: true,
  });
  return result;
};
const getALlProductsFromDB = async () => {
  const result = await await Product.find({ isDeleted: false });
  return result;
};
const getASingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id, isDeleted: false });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getALlProductsFromDB,
  getASingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
