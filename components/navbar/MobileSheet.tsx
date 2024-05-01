import Image from "next/image";
import { Fredoka } from "next/font/google";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import clsx from "clsx";
import { ScrollArea } from "../ui/scroll-area";
import { HomeIcon, Menu, Search, ShoppingBag, Store } from "lucide-react";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent side="left" className={clsx(fredoka.className)}>
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
            <p className="font-medium font">Featured</p>
            <HomeIcon size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
          <Link href="/discover" className="flex justify-between">
            <p className="font-medium font">Discover</p>
            <Search size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
          <Link href="/products" className="flex justify-between">
            <p className="font-medium font">Products</p>
            <ShoppingBag size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
          <Link href="/store" className="flex justify-between">
            <p className="font-medium font">Store</p>
            <Store size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
