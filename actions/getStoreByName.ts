import { db } from "@/lib/prisma";

interface IParams {
  storeId?: string;
  storeName?: string;
}

export default async function getStorebyName(params: IParams) {
  try {
    const { storeId, storeName } = params;

    if (!storeId && !storeName) {
      return { message: "Parameter is required" };
    }

    const query: any = {};

    if (storeId) {
      query.id = storeId;
    }

    if (storeName) {
      query.name = storeName;
    }

    const store: any = await db.store.findMany({
      where: query,
      include: {
        products: {
          select: {
            id: true,
            name: true,
            images: true,
            price: true,
            isFeatured: true,
            store: true,
          },
        },
      },
    });
    return store[0];
  } catch (error: any) {
    return { message: error.message };
  }
}
