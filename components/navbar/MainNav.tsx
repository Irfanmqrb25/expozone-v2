"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Container from "../Container";
import MobileSheet from "./MobileSheet";

import Link from "next/link";

import CartSheet from "./CartSheet";
import AvatarProfile from "./AvatarProfile";
import SearchProduct from "../input/SearchProduct";

import { Store } from "@prisma/client";
import { ExtendedSession } from "@/next-auth";

interface MainNavProps {
  session?: ExtendedSession;
  store?: Store;
}

const MainNav: React.FC<MainNavProps> = ({ session, store }) => {
  const router = useRouter();
  return (
    <nav className="fixed z-50 w-full px-4 py-4 bg-black shadow-sm md:px-8 lg:px-16">
      <div className="flex items-center justify-between w-full text-white">
        <div className="flex items-center">
          <div className="mt-[5px] lg:hidden">
            <MobileSheet />
          </div>
          <div
            onClick={() => router.push("/featured")}
            className="items-center hidden gap-2 cursor-pointer lg:flex"
          >
            <Image
              src="/assets/brand-logo.svg"
              alt="brand logo"
              width={30}
              height={30}
              className="border border-white"
            />
            <span className="hidden text-xl font-semibold xl:block">
              Expozone
            </span>
          </div>
          <div className="items-center hidden mt-[6px] ml-10 gap-14 lg:flex">
            <Link href="/featured">Featured</Link>
            <Link href="/discover">Discover</Link>
            <Link href="/products">Products</Link>
            <Link href="/store">Store</Link>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 md:gap-3">
          <SearchProduct className="w-fit md:w-[300px] border-2 border-white" />
          {session ? (
            <div className="flex items-center gap-3">
              <CartSheet />
              <AvatarProfile session={session} store={store!} />
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="px-4 py-1 border-2 border-white rounded-sm hover:bg-[#006E7F] hover:text-white"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
