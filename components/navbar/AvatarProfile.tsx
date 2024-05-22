"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { signOut } from "next-auth/react";
import useCreateStoreModal from "@/hooks/useCreateStoreModal";
import {
  LogOut,
  UserIcon,
  StoreIcon,
  ShoppingBag,
  Heart,
  FolderArchive,
} from "lucide-react";
import { ExtendedSession } from "@/next-auth";
import { Store } from "@prisma/client";

const AvatarProfile = ({
  session,
  store,
}: {
  session: ExtendedSession;
  store: Store;
}) => {
  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar className="w-9 h-9">
              <AvatarImage
                src={session?.image || "/assets/blank-user.jpg"}
                alt="image user"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 bg-white z-[110]"
            side="bottom"
            align="end"
          >
            <DropdownMenuLabel className="flex flex-col">
              <p>{session?.name}</p>
              <p className="text-xs font-normal text-gray-400">
                {session?.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-100" />
            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="w-4 h-4 mr-2" />
                  <span>Profil</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/assets">
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <FolderArchive className="w-4 h-4 mr-2" />
                  <span>Aset</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/favorites">
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <Heart className="w-4 h-4 mr-2" />
                  <span>Favorit</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/orders">
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  <span>Pemesanan</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-neutral-100" />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          className="hover:bg-[#006E7F] hover:text-white py-[6px] border-black border-2 hidden lg:block"
        >
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      )}
    </div>
  );
};

export default AvatarProfile;
