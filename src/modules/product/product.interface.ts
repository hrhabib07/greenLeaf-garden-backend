import { Types } from "mongoose";

export type TProduct = {
  title: string;
  price: number;
  category: Types.ObjectId;
  description: string;
  rating: number;
  image: string; // URL to the image
  brand: string;
  stock: number; // Available quantity in stock
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductQuery = {
  searchTerm?: string;
  sort?: string;
  limit?: string;
  page?: string;
};
