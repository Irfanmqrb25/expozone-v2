import { getCurrentUser } from "@/data/get-user";
import { db } from "@/lib/prisma";

export default async function getStore() {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return null;
    }

    const stores = await db.store.findUnique({
      where: {
        userId: session?.id,
      },
    });

    return stores;
  } catch (error) {
    console.log(error);
  }
}
