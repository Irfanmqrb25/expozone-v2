import { db } from "@/lib/prisma";
import getStore from "./getStore";
import { format } from "date-fns";
import { getCurrentUser } from "@/data/get-user";
import { ProductsColumn } from "@/components/table/ProductTable";

export default async function getProductByStore() {
  try {
    const session = await getCurrentUser();
    const store = await getStore();
    if (!session) {
      return [];
    }
    if (!store) {
      return [];
    }
    const products = await db.product.findMany({
      where: {
        storeId: store?.id,
      },
      include: {
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const formatedProducts: ProductsColumn[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: Number(product.price),
      isFeatured: product.isFeatured,
      createdAt: format(product.createdAt, "dd/MM/yyyy"),
    }));
    return formatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
