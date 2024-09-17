/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Category from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};
const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>
) => {
  // check if the Category is deleted
  const isCategoryExist = await Category.findOne({ _id: id, isDeleted: false });
  if (!isCategoryExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "This Category does not exists");
  }

  const result = await Category.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndUpdate(id, {
    isDeleted: true,
    new: true,
  });
  return result;
};
const getALlCategoriesFromDB = async () => {
  const result = await Category.find();
  return result;
};
const getASingleCategoryFromDB = async (id: string) => {
  const result = await Category.findOne({ _id: id, isDeleted: false });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getALlCategoriesFromDB,
  getASingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
