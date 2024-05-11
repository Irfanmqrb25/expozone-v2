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
          message: "Password must be at least 8 characters long",
        })
        .regex(/^(?=.*[A-Z]).{8,}$/, {
          message: "Password must contain at least one uppercase letter.",
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
      message: "New password is required",
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
      message: "New password is required",
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
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
