"use client";

import { Order } from "@prisma/client";
import React from "react";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6">
      {orders.length > 0 ? (
        orders.map((order) => <OrderItem key={order.id} order={order} />)
      ) : (
        <div className="min-h-[200px]">
          <h2 className="text-xl font-semibold text-center">
            Tidak ada pemesanan
          </h2>
        </div>
      )}
    </div>
  );
};

export default OrderList;
