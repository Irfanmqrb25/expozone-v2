"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import CellActionsProduct from "./cell-actions-product";

import axios from "axios";
import { toast } from "sonner";
import { Store } from "@prisma/client";
import { rupiahFormat } from "@/lib/utils";

export type ProductsColumn = {
  id: string;
  name: string;
  category: string;
  price: number;
  isFeatured: boolean;
  createdAt: string;
};

interface ProductTableProps {
  productData: ProductsColumn[];
  store: Store;
}

export default function ProductTable({
  productData,
  store,
}: ProductTableProps) {
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const router = useRouter();

  const columns: ColumnDef<ProductsColumn>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedRowIds((prev) =>
              prev.length === productData.length
                ? []
                : productData.map((row) => row.id)
            );
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedRowIds((prev) =>
              value
                ? [...prev, row.original.id]
                : prev.filter((id) => id !== row.original.id)
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Produk",
    },
    {
      accessorKey: "category",
      header: "Kategori",
    },
    {
      accessorKey: "price",
      header: "Harga",
      cell: ({ row }) => <p>{rupiahFormat(Number(row.original.price))}</p>,
    },
    {
      accessorKey: "isFeatured",
      header: "Unggulan",
      cell: ({ row }) => <p>{row.original.isFeatured ? "Ya" : "Tidak"}</p>,
    },
    {
      accessorKey: "createdAt",
      header: "Dibuat Pada",
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActionsProduct data={row.original} />,
    },
  ];

  async function deleteProduct(productId: string) {
    try {
      await axios.delete(`/api/product/${productId}`);
      router.refresh();
      toast.success("Product has been deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  const handleDeleteSelected = async () => {
    await Promise.all(selectedRowIds.map((id) => deleteProduct(id)));
    setSelectedRowIds([]);
  };

  return (
    <DataTable
      store={store}
      columns={columns}
      data={productData}
      deleteRowsAction={() => void handleDeleteSelected()}
    />
  );
}
