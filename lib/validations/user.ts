import * as z from "zod";

export const EditProfileSchema = z.object({
  name: z.optional(z.string().min(1, { message: "Name is required" })),
  image: z.optional(z.string()),
  email: z.optional(
    z.string().email({ message: "Please enter a valid email" })
  ),
  isTwoFactorEnabled: z.optional(z.boolean()),
});

export const ChangePasswordSchema = z
  .object({
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(
      z
        .string()
        .min(8, {
          message: "Kata Sandi harus lebih dari 8 karakter",
        })
        .regex(/^(?=.*[A-Z]).{8,}$/, {
          message:
            "Kata sandi harus terdiri dari setidaknya satu huruf kapital",
        })
    ),
    confirmPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Masukkan kata sandi baru",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Masukkan kata sandi lama",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Kata sandi baru tidak cocok",
      path: ["confirmPassword"],
    }
  );
