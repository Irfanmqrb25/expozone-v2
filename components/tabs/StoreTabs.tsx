"use client";
import { usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

const StoreTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      title: "Profil",
      href: `/store`,
    },
    {
      title: "Produk",
      href: `/store/products`,
    },
    {
      title: "Pesanan",
      href: `/store/orders`,
    },
    {
      title: "Ulasan",
      href: `/store/reviews`,
    },
  ];

  return (
    <Tabs onValueChange={(value) => router.push(value)}>
      <TabsList className="w-full space-x-1 bg-black md:w-fit">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={cn(
              "text-white hover:bg-white/40 w-full md:w-[100px]",
              pathname === tab.href && "bg-white text-foreground shadow-sm"
            )}
            onClick={() => router.push(tab.href)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default StoreTabs;
