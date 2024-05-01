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
import { OrdersColumn } from "./OrderTable";

import axios from "axios";
import { MoreHorizontal, Rocket, Trash } from "lucide-react";
import { toast } from "sonner";

interface CellActionsProps {
  data: OrdersColumn;
}

const CellActionsOrder: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/order/${data.id}`);
      toast.success("Order has been deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleupdateStatus = async (orderId: string, status: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/order/${orderId}`, { status });
      toast.success("Status has been updated.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
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
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            className="flex items-center"
            href={`/store/orders/${data.id}/details`}
          >
            <Rocket size={15} className="mr-1" />
            Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-red-500">
          <Trash size={15} className="mr-1" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActionsOrder;
