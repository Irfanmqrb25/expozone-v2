"use client";

import Link from "next/link";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import FavoriteButton from "../FavoriteButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import useCart from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { ExtendedSession } from "@/next-auth";
import { Product, Store } from "@prisma/client";

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
      ? productData.store.name.replace(/\s+/g, "-")
      : productData.store.name;

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    cart.addItem(productData);
  };

  return (
    <Card className="w-full md:max-w-[300px] overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1 border-black border shadow-custom">
      <div className="relative">
        <Link href={`/${storeUrl}/${productData.id}`}>
          <Image
            alt="Product Image"
            className="object-cover border-b border-black w-full h-[270px] md:h-[210px]"
            height={500}
            width={500}
            src={productData.images[0]}
          />
        </Link>
        <div className="absolute z-50 p-1 bg-white rounded-sm top-2 right-2">
          <FavoriteButton productId={productData.id} session={session} />
        </div>
      </div>
      <CardContent className="py-4 space-y-2">
        <Link href={`/visit/${storeUrl}`} className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              alt="Product Image"
              loading="lazy"
              src={productData.store.image || "/blank-user.jpg"}
            />
          </Avatar>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {productData.store.name}
          </p>
        </Link>
        <div>
          <CardTitle className="text-lg font-medium line-clamp-1">
            {productData.name}
          </CardTitle>
          <CardDescription className="font-light text-gray-500 line-clamp-1">
            {productData.description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium line-clamp-1">
            {rupiahFormat(Number(productData.price))}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center gap-1 text-sm font-medium text-black/70 hover:text-black"
          >
            <ShoppingCart size={14} />
            Keranjang
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
