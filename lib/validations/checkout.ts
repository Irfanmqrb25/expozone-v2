import { z } from "zod";

export const CheckoutSchema = z.object({
  totalPrice: z.coerce.number(),
  productIds: z.string().array(),
});
