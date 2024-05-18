import { z } from "zod";

export const ReviewSchema = z.object({
  message: z.string().min(1, { message: "Ulasan harus diisi" }),
});
