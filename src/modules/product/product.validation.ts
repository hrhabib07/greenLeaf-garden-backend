import { z } from "zod";

// Define the product validation schema
const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    price: z.number().min(0),
    category: z.string().min(1),
    description: z.string().min(1),
    rating: z.number().min(0).max(5),
    image: z.string().url(), // URL to the image
    brand: z.string().min(1),
    stock: z.number().min(0),
    isDeleted: z.boolean().optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    category: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    rating: z.number().min(0).max(5).optional(),
    image: z.string().url().optional(), // URL to the image
    brand: z.string().min(1).optional(),
    stock: z.number().min(0).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
