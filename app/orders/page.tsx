import { db } from "@/lib/prisma";

import { getCurrentUser } from "@/data/get-user";
import OrderList from "@/components/order/OrderList";
import OrderTabs from "@/components/tabs/OrderTabs";
import { ShoppingBag } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <ShoppingBag size={24} />
          <h1 className="text-xl font-bold tracking-tight text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text">
            Riwayat Pemesanan
          </h1>
        </div>
        <p className="text-muted-foreground">
          Lihat semua riwayat pemesanan anda
        </p>
      </div>
      <OrderTabs />
      <div className="px-1 py-4 space-y-6">
        <OrderList orders={orders} />
      </div>
    </div>
  );
};

export default OrderPage;
