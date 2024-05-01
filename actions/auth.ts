"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/auth/get-user";
import {
  getTwoFactorTokenByEmail,
  getVerificationTokenByToken,
} from "@/data/auth/get-token";
import {
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/mail";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/token";
import {
  NewPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
} from "@/lib/validations/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/auth/get-two-factor-auth";

import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/prisma";
import { AuthError } from "next-auth";
import { getPasswordResetTokenByToken } from "@/data/auth/get-password";
import { signIn as nextAuthSignIn } from "@/app/api/(lib)/auth/[...nextauth]/auth";

export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Memeriksa apakah email sudah digunakan
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  // Jika email sudah digunakan, kembalikan pesan kesalahan
  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  // Jika email belum digunakan, tambahkan pengguna
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // Buat token verifikasi untuk email yang baru didaftarkan
  const verficationToken = await generateVerificationToken(email);

  // Kirim email verifikasi
  await sendVerificationEmail(
    verficationToken.currentEmail,
    verficationToken.token
  );

  return {
    success: "Confirmation email sent!",
  };
};

export const signIn = async (
  data: z.infer<typeof SignInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = SignInSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  // Mnedapatkan pengguna yang sudah ada/terbuat berdasarkan email
  const existingUser = await getUserByEmail(email);

  // Jika pengguna tidak ditemukan atau email/password tidak tersedia, kembalikan pesan kesalahan
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // Jika email belum terverifikasi
  if (!existingUser.emailVerified) {
    // Buat token verifikasi
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    // Kirim email verifikasi
    await sendVerificationEmail(existingUser.email, verificationToken.token);

    return {
      success: "Confirmation Email sent!",
    };
  }

  // Jika 2FA diaktifkan, lanjutkan dengan proses dua faktor
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // Validasi kode dua faktor yang diberikan
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return {
          error: "Invalid code!",
        };
      }

      // Periksa apakah kode dua faktor yang diberikan dengan yang dimasukkan sama
      if (twoFactorToken.token !== code) {
        return {
          error: "Invalid code!",
        };
      }

      // Periksa apakah token dua faktor telah kedaluwarsa
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return {
          error: "Code expired!",
        };
      }

      // jika berhasil, hapus token 2FA
      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      // Dapatkan konfirmasi dua faktor yang ada untuk pengguna yang terkait
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      // Jika sudah ada konfirmasi 2FA yang ada, hapus konfirmasi 2FA tersebut dari database
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      // Buat konfirmasi 2FA jika belum ada
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      // Jika tidak ada kode 2FA yang diberikan, kirim token 2FA ke email pengguna dan kembalikan informasi dua faktor
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      // Lalu Kirim email dua faktor
      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return {
        twoFactor: true,
      };
    }
  }

  // Lanjutkan masuk pengguna dengan tipe credential
  try {
    await nextAuthSignIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    // Tangani kesalahan autentikasi
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    // Lempar error jika bukan tipe AuthError
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await getUserByEmail(
    existingToken.currentEmail || existingToken.newEmail!
  );
  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  if (existingToken.currentEmail && existingToken.newEmail) {
    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.newEmail,
      },
    });
  }

  if (existingToken.currentEmail && !existingToken.newEmail) {
    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.currentEmail,
      },
    });
  }

  await db.verficationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Email verified successfully!",
  };
};

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "email not found!",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, passwordResetToken.token);

  return {
    success: "Email sent!",
  };
};

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return {
      error: "Missing token!",
    };
  }

  const validatedFields = NewPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { newPassword, confirmPassword } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Invalid token!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      error: "Passwords do not match!",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Password reset successfully!",
  };
};
