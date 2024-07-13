import { z } from "zod";

const ProductDataSchema = z.object({
  id: z.string().nonempty(),
  quantity: z.number().int().min(1),
  price: z.number().positive(),
});

const OrderSchema = z.object({
  body: z.object({
    name: z.string().nonempty(),
    phone: z.string().nonempty(),
    address: z.string().nonempty(),
    order: z.array(ProductDataSchema),
  }),
});

export { ProductDataSchema, OrderSchema };
