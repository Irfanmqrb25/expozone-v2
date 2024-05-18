import * as z from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1, {
    message: "Nama perlu diisi",
  }),
  email: z.string().min(1, { message: "Email perlu diisi" }).email({
    message: "Masukkan email yang valid",
  }),
  password: z
    .string()
    .min(8, {
      message: "Kata Sandi harus lebih dari 8 karakter",
    })
    .regex(/^(?=.*[A-Z]).{8,}$/, {
      message: "Kata sandi harus terdiri dari setidaknya satu huruf kapital",
    }),
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "Masukkan email yang valid" }),
  password: z.string().min(1, { message: "Kata sandi perlu diisi" }),
  code: z.optional(z.string()),
});

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Masukkan email yang valid" })
    .min(1, { message: "Email perlu diisi" }),
});

export const NewPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, {
      message: "Kata sandi harus lebih dari 8 karakter",
    })
    .regex(/^(?=.*[A-Z]).{8,}$/, {
      message: "Kata sandi harus terdiri dari setidaknya satu huruf kapital",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Kata sandi harus lebih dari 8 karakter",
    })
    .regex(/^(?=.*[A-Z]).{8,}$/, {
      message: "Kata sandi harus terdiri dari setidaknya satu huruf kapital",
    }),
});
