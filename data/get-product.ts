import { db } from "@/lib/prisma";

export async function getProducts({ category }: { category?: string }) {
  try {
    const products = await db.product.findMany({
      where: {
        category,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        store: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getFeaturedProduct(category: string) {
  if (!category) {
    return [];
  }

  try {
    const products = await db.product.findMany({
      where: {
        isFeatured: true,
        category: {
          equals: category,
        },
      },
      include: {
        store: true,
      },
      take: 5,
    });

    return products;
  } catch (error) {
    console.log(error);
  }
}

export const getNewProduct = async () => {
  try {
    const newProduct = await db.product.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        store: true,
      },
    });
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const getBestSellingProducts = async () => {
  try {
    const bestSellingProducts = await db.orderItem.groupBy({
      by: ["productId"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 5,
    });

    const productIds = bestSellingProducts.map((item) => item.productId);

    const topProducts = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        store: true,
      },
    });

    const sortedTopProducts = bestSellingProducts.map((bestSellingProduct) => {
      return topProducts.find(
        (product) => product.id === bestSellingProduct.productId
      );
    });

    return sortedTopProducts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch best selling products");
  }
};
