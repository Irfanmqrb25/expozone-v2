import * as z from "zod";

export const UpdateStoreSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image: z.optional(z.string()),
  email: z.string().email({ message: "Please enter a valid email" }),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
