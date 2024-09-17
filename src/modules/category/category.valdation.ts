import { z } from "zod";

// Define the Category validation schema
const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    isDeleted: z.boolean().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
