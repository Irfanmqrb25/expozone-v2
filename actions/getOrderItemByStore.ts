import { Store } from "@prisma/client";
import getStore from "./getStore";
import { db } from "@/lib/prisma";
import { OrdersColumn } from "@/components/table/OrderTable";
import { format } from "date-fns";

export default async function getOrderItemByStore(store: Store) {
  try {
    if (!store) {
      return [];
    }

    const orderItems = await db.orderItem.findMany({
      where: {
        storeId: store.id,
      },
      include: {
        order: {
          select: {
            status: true,
          },
        },
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedOrders: OrdersColumn[] = orderItems.map((orderItem) => ({
      id: orderItem.id,
      product: {
        name: orderItem.product.name,
        price: Number(orderItem.product.price),
      },
      order: {
        status: orderItem.order.status,
      },
      createdAt: format(orderItem.createdAt, "dd/MM/yyyy"),
    }));

    return formattedOrders;
  } catch (error) {
    console.log(error);
    return [];
  }
}
