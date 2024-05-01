"use client";

import Link from "next/link";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import FavoriteButton from "../FavoriteButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import axios from "axios";
import { toast } from "sonner";
import useCart from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { ExtendedSession } from "@/next-auth";
import { Product, Store } from "@prisma/client";
import { rupiahFormat } from "@/lib/utils";

interface ProductCard {
  productData: Product & {
    store: Store;
  };
  session: ExtendedSession;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCard> = ({ productData, session }) => {
  const cart = useCart();
  const router = useRouter();

  const storeUrl =
    productData.store.name.split(" ").length > 1
      ? productData.store.name.toLocaleLowerCase().replace(/\s+/g, "-")
      : productData.store.name;

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    cart.addItem(productData);
  };

  return (
    <Card className="w-full md:max-w-[300px] overflow-hidden border-2 border-black shadow-card">
      <Link href={`/${storeUrl}/${productData.id}`}>
        <Image
          alt="Product Image"
          className="object-cover border-b-2 border-black w-full h-[270px] md:h-[210px]"
          height={500}
          width={500}
          src={productData.images[0]}
        />
      </Link>
      <CardContent className="py-4 space-y-2">
        <Link href={`/visit/${storeUrl}`} className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              alt="Shop Image"
              src={productData.store.image || "/blank-user.jpg"}
            />
          </Avatar>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {productData.store.name}
          </p>
        </Link>
        <CardTitle className="text-lg font-medium">
          {productData.name}
        </CardTitle>
        <p className="font-light text-gray-500 line-clamp-2">
          {productData.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium line-clamp-1">
            {rupiahFormat(Number(productData.price))}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center gap-1 text-sm font-medium text-black/70 hover:text-black"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
