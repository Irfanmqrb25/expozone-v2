"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import clsx from "clsx";
import qs from "query-string";
import { categories } from "@/lib/data";
import { FilterIcon } from "lucide-react";

const Filter = () => {
  const router = useRouter();
  const params = useSearchParams();

  const handleSelected = React.useCallback(
    (label: string) => {
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      if (params?.get("category") === label) {
        delete updatedQuery.category;
      }

      const url = qs.stringifyUrl(
        {
          url: "/products",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center px-3 text-sm font-medium transition-colors rounded bg-primary text-primary-foreground hover:bg-primary/90 h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background">
          <FilterIcon size={16} className="mr-1" />
          <span>
            {params?.get("category") ? params?.get("category") : "Filter"}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" side="bottom" align="start">
          <DropdownMenuLabel>Filter Product</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category, i) => (
            <DropdownMenuCheckboxItem
              key={i}
              checked={params?.get("category") === category.label}
              onCheckedChange={() => handleSelected(category.label)}
            >
              {category.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {params?.get("category") && (
        <Button
          variant="destructive"
          className="rounded"
          size="sm"
          onClick={() => {
            router.push("/products");
          }}
        >
          X
        </Button>
      )}
    </div>
  );
};

export default Filter;
