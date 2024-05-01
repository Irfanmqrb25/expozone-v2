import { db } from "@/lib/prisma";

import { getCurrentUser } from "@/data/get-user";
import OrderList from "@/components/order/OrderList";
import OrderTabs from "@/components/tabs/OrderTabs";

const OrderPage = async ({
  searchParams,
}: {
  searchParams: { status: "PENDING" | "PAID" | "CANCELED" };
}) => {
  const session = await getCurrentUser();

  let orders;

  if (searchParams.status) {
    const ordersWithStatus = await db.order.findMany({
      where: {
        userId: session?.id,
        status: searchParams.status,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    orders = ordersWithStatus;
  } else {
    const allOrders = await db.order.findMany({
      where: {
        userId: session?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    orders = allOrders;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-3xl font-medium">Order</p>
        <p className="text-muted-foreground">See Your Transaction History</p>
      </div>
      <OrderTabs />
      <div className="px-1 py-4 space-y-6">
        <OrderList orders={orders} />
      </div>
    </div>
  );
};

export default OrderPage;
