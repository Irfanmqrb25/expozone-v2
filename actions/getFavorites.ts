import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/data/get-user";
export default async function getFavoriteProducts() {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return [];
    }

    const favorites = await db.product.findMany({
      where: {
        id: {
          in: [...(session.favoriteIds || [])],
        },
      },
      include: {
        store: true,
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
