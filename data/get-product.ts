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
