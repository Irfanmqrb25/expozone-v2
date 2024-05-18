import * as z from "zod";

export const ProductSchema = z.object({
  images: z.array(z.string()),
  name: z.string().min(1, { message: "Nama produk perlu diisi" }),
  category: z.string().min(1, { message: "Pilih kategori produk anda" }),
  price: z.coerce.number().min(1, { message: "Harga perlu diisi" }),
  description: z.string().min(1, { message: "Deskripsi perlu diisi" }),
  isFeatured: z.boolean().optional(),
  productAssets: z
    .union([
      z
        .array(
          z.object({
            name: z.string().optional(),
            url: z.string().min(1, { message: "URL perlu diisi" }),
            size: z.number().optional(),
          })
        )
        .nonempty({ message: "Aset produk tidak boleh kosong" }),
      z
        .string()
        .min(1, { message: "Aset produk tidak boleh kosong" })
        .url({ message: "URL tidak valid" }),
    ])
    .refine(
      (value) => {
        // Check if value is an array and is not empty
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        // Check if value is a non-empty string
        if (typeof value === "string") {
          return value.length > 0;
        }
        // Neither array nor string is valid
        return false;
      },
      {
        message: "Aset produk tidak boleh kosong",
      }
    ),
});
