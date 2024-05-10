"use server";

import { getCurrentUser } from "@/data/get-user";
import { db } from "@/lib/prisma";
import { ReviewSchema } from "@/lib/validations/review";
import * as z from "zod";

export const addReview = async (
  data: z.infer<typeof ReviewSchema>,
  productId: string
) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Tidak diizinkan!" };
  }

  await db.review.create({
    data: {
      message: data.message,
      userId: user.id,
      productId: productId,
    },
  });

  return { success: "Ulasan diberikan" };
};
