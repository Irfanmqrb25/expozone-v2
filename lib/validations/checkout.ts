import { z } from "zod";

export const CheckoutSchema = z.object({
  totalPrice: z.coerce.number().min(1, { message: "Total harga harus diisi" }),
  productIds: z.string().array().min(1, { message: "Produk id harus diisi" }),
});
