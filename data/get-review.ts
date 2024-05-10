import { db } from "@/lib/prisma";
import getStore from "@/actions/getStore";

export const getStoreProductReviews = async () => {
  const store = await getStore();

  try {
    const products = await db.product.findMany({
      where: {
        storeId: store?.id,
      },
      select: {
        id: true,
      },
    });

    const productIds = products.map((product) => product.id);

    const reviews = await db.review.findMany({
      where: {
        productId: {
          in: productIds,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        product: {
          select: {
            name: true,
            images: true,
          },
        },
      },
    });

    return reviews;
  } catch (error) {
    return [];
  }
};

export const getProductReviews = async (productId: string) => {
  if (!productId) {
    return [];
  }

  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return reviews;
};
