"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { MdFilterListAlt } from "react-icons/md";

import CategoryItem from "./CategoryItem";
import { categories } from "@/lib/data";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isHomePage = pathname === "/home";

  if (!isHomePage) {
    return null;
  }

  return (
    <div className="px-16 py-3">
      <div className="flex flex-row items-center justify-between gap-2 overflow-x-scroll lg:overflow-x-hidden xl:gap-0">
        <div className="flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded-xl">
          <MdFilterListAlt />
          <span className="text-sm">Filter</span>
        </div>
        {categories.map((item) => (
          <CategoryItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
