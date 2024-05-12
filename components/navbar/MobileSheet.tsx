import Link from "next/link";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";

import { Menu, Search, ShoppingBag, Sparkles, Store } from "lucide-react";

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="flex gap-2 text-2xl">
            <Image
              src="/assets/brand-logo.svg"
              alt="logo"
              width={25}
              height={25}
            />
            Expozone
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="mt-10">
          <Link href="/featured" className="flex justify-between">
            <p className="font-medium font">Unggulan</p>
            <Sparkles size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
          <Link href="/discover" className="flex justify-between">
            <p className="font-medium font">Pencarian</p>
            <Search size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
          <Link href="/products" className="flex justify-between">
            <p className="font-medium font">Produk</p>
            <ShoppingBag size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
          <Link href="/store" className="flex justify-between">
            <p className="font-medium font">Toko</p>
            <Store size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
