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
const getALlProductsFromDB = async (query: Record<string, undefined>) => {
  // console.log("base query", query.category);
  const queryObj = { ...query };
  const excludesField = ["searchTerm", "sort"];
  excludesField.forEach((el) => delete queryObj[el]);
  // console.log(queryObj);
  let searchTerm = "";
  if (query.searchTerm) {
    searchTerm = query.searchTerm;
  }

  const searchQuery = Product.find({
    isDeleted: false,
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { brand: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ],
  });
  const filterQuery = searchQuery.find(queryObj);

  let sort = "-cratedAt";
  if (query.sort) {
    sort = query.sort;
  }

  const sortQuery = await filterQuery.sort(sort);
  return sortQuery;
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
