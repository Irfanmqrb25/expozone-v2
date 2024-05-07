import { db } from "@/lib/prisma";

export interface IProductParams {
  category?: string;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category } = params;
    let query: any = {};

    if (category) {
      query.category = category;
    }

    const products = await db.product.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        store: true,
      },
    });

    return products;
  } catch (error) {
    console.log(error);
  }
}
