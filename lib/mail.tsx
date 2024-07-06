import { Resend } from "resend";

import { VerificationEmail } from "@/components/email/VerificationEmail";

const resend = new Resend("re_NY1NEpxG_6JPbm89h7NF7NezGRtruhbsj");

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/email-verification?token=${token}`;

  await resend.emails.send({
    from: "expozone <no-reply@irfanmuqorib.dev>",
    to: email,
    subject: "Expozone Email Verification",
    react: <VerificationEmail token={token} />,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "expozone <no-reply@irfanmuqorib.dev>",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "expozone <no-reply@irfanmuqorib.dev>",
    to: email,
    subject: "2FA Code",
    html: `<p>Your two factor authentication code is ${token}</p>`,
  });
};
