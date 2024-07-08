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
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export const productValidation = { createProductValidationSchema };
