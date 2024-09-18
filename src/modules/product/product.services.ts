/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct, TProductQuery } from "./product.interface";
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
const getALlProductsFromDB = async (query: TProductQuery) => {
  // console.log("base query", query.category);
  const queryObj: Record<string, any> = { ...query };
  const excludesField = ["searchTerm", "sort", "limit", "page"];
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
      // { category: { $regex: searchTerm, $options: "i" } },
    ],
  });
  const filterQuery = searchQuery.find(queryObj);

  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort;
  }
  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 3;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  if (query.page || query.limit) {
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = await paginateQuery.limit(limit).populate("category");
    return limitQuery;
  } else {
    return await filterQuery.sort(sort).populate("category");
  }
};
const getASingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id, isDeleted: false }).populate(
    "category"
  );
  return result;
};

export const productServices = {
  createProductIntoDB,
  getALlProductsFromDB,
  getASingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
