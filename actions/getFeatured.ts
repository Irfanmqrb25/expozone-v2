import { db } from "@/lib/prisma";

interface IParams {
  category: string;
}

export default async function getFeatured(params: IParams) {
  const { category } = params;

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
