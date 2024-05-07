"use client";

import { useTransition } from "react";
import { Input } from "../ui/input";
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Store } from "@prisma/client";

interface DataTableHeaderProps {
  table: any;
  deleteRowAction: any;
  searchKey: string;
  store: Store;
}

const DataTableHeader = ({
  table,
  deleteRowAction,
  searchKey,
  store,
}: DataTableHeaderProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center py-4">
        <Input
          placeholder={
            pathname === "/store/products"
              ? "Cari nama produk..."
              : "Cari nama produk..."
          }
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="flex md:w-[300px]"
        />
      </div>
      {deleteRowAction && table.getSelectedRowModel().rows.length > 0 ? (
        <Button
          size="sm"
          onClick={(e) => {
            startTransition(() => {
              table.toggleAllPageRowsSelected(false);
              deleteRowAction(e);
            });
          }}
          disabled={isPending}
          variant="destructive"
        >
          <Trash size={16} className="mr-1" />
          Hapus
        </Button>
      ) : pathname === "/store/products" && store ? (
        <Button size="sm" onClick={() => router.push("/store/products/new")}>
          <PlusCircle size={16} className="mr-1" />
          Tambah Produk
        </Button>
      ) : null}
    </div>
  );
};

export default DataTableHeader;
