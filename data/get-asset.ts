import { db } from "@/lib/prisma";
import { getCurrentUser } from "./get-user";

export const getUserAssets = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [null];
    }

    const userOrder = await db.order.findMany({
      where: {
        userId: user.id,
        status: "PAID",
      },
      select: {
        orderItems: {
          select: {
            productId: true,
          },
        },
      },
    });

    const productIds = userOrder.map((item) =>
      item.orderItems.map((orderItem) => orderItem.productId)
    );

    const assets = await db.productAsset.findMany({
      where: {
        productId: {
          in: productIds.flat(),
        },
      },
    });

    return assets;
  } catch (error) {
    return [];
  }
};
