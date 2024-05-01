"use server";

import { db } from "@/lib/prisma";
import { GetOrderItems } from "@/types";

export const getOrderItems = async (
  orderId: string
): Promise<GetOrderItems[] | null> => {
  const orderItems = await db.orderItem.findMany({
    where: {
      orderId,
    },
    include: {
      product: true,
      store: true,
    },
  });

  return orderItems;
};

export const getUserOrderItemsDetails = async (orderId: string) => {
  const orderItems = await db.orderItem.findMany({
    where: {
      orderId: orderId,
    },
    include: {
      product: {
        include: {
          store: true,
          productAssets: true,
        },
      },
    },
  });
  return orderItems;
};
