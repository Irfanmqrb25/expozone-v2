"use client";

import { rupiahFormat } from "@/lib/utils";
import { Product, Store } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import useCart from "@/hooks/useCart";

interface CheckoutItemProps {
  productData: Product;
}

const CheckoutItem = ({ productData }: CheckoutItemProps) => {
  const cart = useCart();

  return (
    <li className="flex gap-4 py-6 border-b border-black">
      <div className="relative w-24 h-24 overflow-hidden rounded-md sm:w-32 sm:h-32">
        <Image
          fill
          src={productData.images[0]}
          alt={productData.name}
          className="object-cover object-center"
        />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-bold">{productData.name}</p>
        <p className="text-sm text-muted-foreground">{productData.category}</p>
        <p className="font-medium">{rupiahFormat(Number(productData.price))}</p>
      </div>
      <div className="flex justify-end flex-1 my-auto">
        <Button
          size="icon"
          variant="destructive"
          onClick={() => cart.removeItem(productData.id)}
        >
          <Trash size={16} />
        </Button>
      </div>
    </li>
  );
};

export default CheckoutItem;
