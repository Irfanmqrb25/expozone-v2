"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Package2, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsQuestionCircle, BsStar } from "react-icons/bs";

interface MenuProps {
  params: string;
}

const Menu = ({ params }: MenuProps) => {
  const pathname = usePathname();

  return (
    <div className="mt-10">
      <div
        className={clsx(
          "flex items-center w-full text-muted-foreground font-medium"
        )}
      >
        <Link
          href={`/visit/${params}`}
          className={clsx(
            "cursor-pointer flex items-center w-full justify-center pb-1",
            pathname === `/visit/${params}`
              ? "border-b-2 border-black gap-1 text-black"
              : "no-underline"
          )}
        >
          <Store className="text-2xl md:hidden" />
          <span className="hidden md:block">Featured</span>
        </Link>
        <Link
          href={`/visit/${params}/products`}
          className={clsx(
            "cursor-pointer flex items-center w-full justify-center pb-1",
            pathname === `/visit/${params}/products`
              ? "border-b-2 border-black gap-1 text-black"
              : "no-underline"
          )}
        >
          <Package2 className="text-2xl md:hidden" />
          <span className="hidden md:block">Products</span>
        </Link>
        <Link
          href={`/visit/${params}/review`}
          className={clsx(
            "cursor-pointer flex items-center w-full justify-center pb-1",
            pathname === `/visit/${params}/review`
              ? "border-b-2 border-black gap-1 text-black"
              : "no-underline"
          )}
        >
          <BsStar className="text-2xl md:hidden" />
          <span className="hidden md:block">Review</span>
        </Link>
        <Link
          href={`/visit/${params}/forum`}
          className={clsx(
            "cursor-pointer flex items-center w-full justify-center pb-1",
            pathname === `/visit/${params}/forum`
              ? "border-b-2 border-black gap-1 text-black"
              : "no-underline"
          )}
        >
          <BsQuestionCircle className="text-2xl md:hidden" />
          <span className="hidden md:block">Forum</span>
        </Link>
      </div>
      <Separator className="mb-5 h-[1.5px] " />
    </div>
  );
};

export default Menu;
