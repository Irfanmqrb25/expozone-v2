import { Resend } from "resend";

import { VerificationEmail } from "@/components/email/VerificationEmail";
import TwoFactorTokenEmail from "@/components/email/TwoFactorTokenEmail";
import ReceiptEmail from "@/components/email/ReceiptEmail";
import { Order, OrderItem, Store } from "@prisma/client";
import { GetOrderItems } from "@/types";
import { ResetPasswordEmail } from "@/components/email/PasswordResetEmail";

const resend = new Resend("re_NY1NEpxG_6JPbm89h7NF7NezGRtruhbsj");

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "expozone <no-reply@irfanmuqorib.dev>",
    to: email,
    subject: "Expozone Email Verification",
    react: <VerificationEmail token={token} />,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "expozone <no-reply@irfanmuqorib.dev>",
    to: email,
    subject: "Reset your password",
    react: <ResetPasswordEmail token={token} />,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "expozone <no-reply@irfanmuqorib.dev>",
    to: email,
    subject: "Expozone Two Factor Authentication",
    react: <TwoFactorTokenEmail token={token} />,
  });
};

export const sendReceiptEmail = async (
  email: string,
  orderId: string,
  order: Order & {
    orderItems: GetOrderItems[];
  },
  name: string
) => {
  await resend.emails.send({
    from: "expozone <no-reply@irfanmuqorib.dev>",
    to: email,
    subject: "Expozone Receipt",
    react: <ReceiptEmail orderId={orderId} order={order} name={name} />,
  });
};
