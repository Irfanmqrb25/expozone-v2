"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";

import axios from "axios";
import CellActionsOrder from "./cell-actions-order";
import { toast } from "sonner";
import { Store } from "@prisma/client";
import { rupiahFormat } from "@/lib/utils";

export type OrdersColumn = {
  id: string;
  product: {
    name: string;
    price: number;
  };
  order: {
    status: string;
  };
  createdAt: string;
};

interface OrderTableProps {
  orderData: OrdersColumn[];
  store: Store;
}

export default function OrderTable({ orderData, store }: OrderTableProps) {
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const router = useRouter();

  const columns: ColumnDef<OrdersColumn>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => {
    //         table.toggleAllPageRowsSelected(!!value);
    //         setSelectedRowIds((prev) =>
    //           prev.length === orderData.length
    //             ? []
    //             : orderData.map((row) => row.id)
    //         );
    //       }}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => {
    //         row.toggleSelected(!!value);
    //         setSelectedRowIds((prev) =>
    //           value
    //             ? [...prev, row.original.id]
    //             : prev.filter((id) => id !== row.original.id)
    //         );
    //       }}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <p>{row.original.id}</p>,
    },
    {
      accessorKey: "product",
      header: "Produk",
      cell: ({ row }) => <p>{row.original.product.name}</p>,
    },
    {
      accessorKey: "price",
      header: "Harga",
      cell: ({ row }) => (
        <p>{rupiahFormat(Number(row.original.product.price))}</p>
      ),
    },
    {
      accessorKey: "order",
      header: "Status Pembelian",
      cell: ({ row }) => (
        <p>
          {row.original.order.status === "PENDING" && "Menunggu Konfirmasi"}
          {row.original.order.status === "PAID" && "Dibayar"}
          {row.original.order.status === "CANCELED" && "Dibatalkan"}
        </p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Dipesan Pada",
    },
    // {
    //   id: "actions",
    //   cell: ({ row }) => <CellActionsOrder data={row.original} />,
    // },
  ];

  async function deleteOrder(orderId: string) {
    try {
      await axios.delete(`/api/order/${orderId}`);
      router.refresh();
      toast.success("Pesanan telah di hapus.");
    } catch (error) {
      toast.error("Terjadi kesalahan.");
    }
  }

  const handleDeleteSelected = async () => {
    await Promise.all(selectedRowIds.map((id) => deleteOrder(id)));
    setSelectedRowIds([]);
  };

  return (
    <DataTable
      store={store}
      columns={columns}
      data={orderData}
      deleteRowsAction={() => void handleDeleteSelected()}
    />
  );
}
