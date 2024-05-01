import { db } from "@/lib/prisma";

interface IParams {
  productId?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const { productId } = params;

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        store: true,
        productAssets: true,
      },
    });

    if (!product) {
      return null;
    }

    return product;
  } catch (error: any) {
    console.error();
  }
}
