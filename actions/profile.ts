"use server";

import { update } from "@/app/api/(lib)/auth/[...nextauth]/auth";
import { getUserByEmail, getUserById } from "@/data/auth/get-user";
import { getCurrentUser } from "@/data/get-user";
import { sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/token";
import {
  ChangePasswordSchema,
  EditProfileSchema,
} from "@/lib/validations/user";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const editProfile = async (data: z.infer<typeof EditProfileSchema>) => {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Tidak diizinkan!" };
  }

  if (user.isOAuth) {
    data.email = undefined;
    // data.isTwoFactorEnabled = undefined;
  }

  if (data.email && data.email !== user.email) {
    const existingUser = await getUserByEmail(data.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email telah digunakan!" };
    }

    const verificationToken = await generateVerificationToken(
      dbUser.email!,
      data.email
    );
    await sendVerificationEmail(
      verificationToken.newEmail!,
      verificationToken.token
    );

    return { success: "Verifikasi email telah dikirim" };
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...data,
    },
  });

  update({
    user: {
      name: updatedUser.name,
      image: updatedUser.image,
      email: updatedUser.email,
      //   isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return {
    success: "Profil berhasil diperbarui!",
  };
};

export const changePassword = async (
  data: z.infer<typeof ChangePasswordSchema>
) => {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Tidak diizinkan!",
    };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Tidak diizinkan!" };
  }

  if (user.isOAuth) {
    data.password = undefined;
    data.newPassword = undefined;
    data.confirmPassword = undefined;
  }

  if (data.password && data.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(data.password, dbUser.password);

    if (!passwordsMatch) {
      return { error: "Password yang anda masukkan salah!" };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    data.password = hashedPassword;
    data.newPassword = undefined;
    data.confirmPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...data,
    },
  });

  return {
    success: "Password anda telah diperbarui!",
  };
};
