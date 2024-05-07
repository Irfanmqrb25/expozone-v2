"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductsColumn } from "./ProductTable";

import axios from "axios";
import { toast } from "sonner";
import { Edit, MoreHorizontal, Rocket, Trash } from "lucide-react";

interface CellActionsProps {
  data: ProductsColumn;
}

const CellActionsProduct: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/product/${data.id}`);
      toast.success("Produk telah di hapus.");
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={loading}>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="-mt-2">
        <DropdownMenuItem>
          <Link
            className="flex items-center"
            href={`/store/products/${data.id}/detail`}
          >
            <Rocket size={15} className="mr-1" />
            Detil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/store/products/${data.id}`)}
        >
          <Edit size={15} className="mr-1" />
          Ubah
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onConfirm} className="text-red-500">
          <Trash size={15} className="mr-1" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActionsProduct;
