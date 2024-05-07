"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSearch = () => {
    if (!query) {
      return toast.error("Masukkan nama produk!");
    }
    router.push(`/discover/search/?st=${query}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative">
      <input
        className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border-2 border-black rounded-full shadow-search focus:outline-none"
        placeholder="Masukkan nama produk..."
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button
        className="absolute -translate-y-1/2 rounded-full right-2 top-1/2 h-7 w-7"
        size="icon"
      >
        <Search className="w-4 h-4 text-gray-100" />
      </Button>
    </div>
  );
};

export default SearchProduct;
