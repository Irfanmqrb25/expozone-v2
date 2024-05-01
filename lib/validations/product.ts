import * as z from "zod";

export const ProductSchema = z.object({
  images: z.array(z.string()),
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  productAssets: z.union([
    z.array(
      z.object({
        name: z.string().optional(),
        url: z.string(),
        size: z.number().optional(),
      })
    ),
    z.string(), // Allow string type
  ]),
  isFeatured: z.boolean(),
});
