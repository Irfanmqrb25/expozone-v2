import { db } from "@/lib/prisma";

export interface IProductParams {
  storeId?: string;
  price?: number;
  category?: string;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { storeId, price, category } = params;
    let query: any = {};

    if (storeId) {
      query.storeId = storeId;
    }

    if (category) {
      query.category = category;
    }

    if (price) {
      query.price = price;
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
