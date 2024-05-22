"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

import useCart from "@/hooks/useCart";
import { Rupiah } from "@jetmiky/rupiahjs";
import { ShoppingCart, Trash } from "lucide-react";
import { rupiahFormat } from "@/lib/utils";

const CartSheet = () => {
  const cart = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const totalPrice = cart.items.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger className="relative flex items-center justify-center bg-white rounded-full h-9 w-9">
        <ShoppingCart className="w-5 h-5 text-black" />
        {cart.items.length > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] text-white bg-red-500 rounded-full">
            {cart.items.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg z-[110]">
        <SheetHeader>
          <SheetTitle>Keranjang</SheetTitle>
        </SheetHeader>
        <Separator />
        {cart.items.length > 0 ? (
          <div className="flex flex-col h-full gap-4">
            <button
              className="flex items-center gap-1 text-sm w-fit hover:underline"
              onClick={() => cart.removeAll()}
            >
              <Trash size={14} />
              Hapus semua ({cart.items.length})
            </button>
            <div className="flex flex-col flex-1 gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="relative w-16 h-16 overflow-hidden rounded">
                        <Image
                          src={
                            item.images[0] ?? "/images/product-placeholder.webp"
                          }
                          alt={item.name}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                          className="absolute object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="font-medium line-clamp-1">
                          {item.name}
                        </span>
                        <span className="text-xs capitalize line-clamp-1 text-muted-foreground">
                          {item.category}
                        </span>
                        <span className="pt-2 line-clamp-1 text-muted-foreground">
                          {rupiahFormat(Number(item.price))}
                        </span>
                      </div>
                      <div className="flex justify-end flex-1 my-auto">
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => cart.removeItem(item.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xl">Total :</p>
                  <p className="text-xl">{rupiahFormat(totalPrice)}</p>
                </div>
                <Separator />
                <SheetFooter className="mt-1.5">
                  <Button
                    onClick={() => router.push("/checkout")}
                    aria-label="Proceed to checkout"
                    size="sm"
                    className="w-full"
                  >
                    Checkout
                  </Button>
                </SheetFooter>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <ShoppingCart size={60} className="text-muted-foreground" />
            <div className="text-lg text-center md:text-xl text-muted-foreground">
              Tidak ada item di keranjang
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
