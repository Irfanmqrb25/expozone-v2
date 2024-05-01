"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";
import clsx from "clsx";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleSelected = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuerry: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuerry.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/home",
        query: updatedQuerry,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleSelected}
      className={clsx(
        "flex items-center gap-2 px-3 py-2 border transition border-neutral-300 rounded-xl hover:bg-neutral-200 cursor-pointer",
        selected ? "bg-neutral-200" : "bg-white"
      )}
    >
      <Icon size={18} />
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default CategoryItem;
