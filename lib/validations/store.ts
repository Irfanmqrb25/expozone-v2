import * as z from "zod";

export const UpdateStoreSchema = z.object({
  name: z.string().min(1, { message: "Nama toko perlu diisi" }),
  image: z.optional(z.string()),
  email: z
    .string()
    .min(1, { message: "Email toko perlu diisi" })
    .email({ message: "Masukkan email yang valid" }),
  country: z.string().min(1, { message: "Lokasi negara toko perlu diisi" }),
  city: z.string().min(1, { message: "Lokasi kota toko perlu diisi" }),
  address: z.string().min(1, { message: "Alamat lengkap toko perlu diisi" }),
  description: z.string().min(1, { message: "Deskripsi toko perlu diisi" }),
});
