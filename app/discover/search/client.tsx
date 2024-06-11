"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import EmptyMessage from "@/components/EmptyMessage";
import ProductCard from "@/components/card/ProductCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import axios from "axios";
import { PackageOpen, Search } from "lucide-react";
import { ExtendedSession } from "@/next-auth";
import { toast } from "sonner";

interface SearchPageProps {
  session: ExtendedSession;
}

const SearchPageClient = ({ session }: SearchPageProps) => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<any[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [confirmedHasNoResults, setConfirmedHasNoResults] = useState(false);

  const query = searchParams?.get("st");

  useEffect(() => {
    const getData = async () => {
      if (query === "") return setResults([]);
      setIsLoadingResults(true);
      setConfirmedHasNoResults(false);
      try {
        const response = await axios.get(`/api/product?st=${query}`);
        if (response.data.length === 0) {
          setConfirmedHasNoResults(true);
        }
        setResults(response.data);
      } catch (error) {
        toast.error("Terjadi kesalahan!");
      } finally {
        setIsLoadingResults(false);
      }
    };
    getData();
  }, [query]);

  if (confirmedHasNoResults) {
    return (
      <div className="flex flex-col min-h-screen gap-5">
        <div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-2xl">
              <Search size={21} />
              <p>{`Hasil pencarian "${query}"`}</p>
            </div>
            <p className="text-muted-foreground">{`Produk yang cocok (${results.length})`}</p>
          </div>
        </div>
        <div className="mt-20">
          <EmptyMessage
            title="Products Not Found"
            description={`There are no products with name ${query}`}
            icon={PackageOpen}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen gap-5">
      {query === "new-arrival" && (
        <div>
          <h1 className="text-xl font-bold tracking-tight text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text">
            Produk Terbaru
          </h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            Temukan produk digital terbaru
          </p>
        </div>
      )}
      {query === "best-selling" && (
        <div>
          <h1 className="text-xl font-bold tracking-tight text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text">
            Penjualan Terbaik
          </h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            Temukan produk digital terlaris
          </p>
        </div>
      )}
      {query !== "new-arrival" && query !== "best-selling" && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-2xl">
            <Search size={21} />
            <p>{`Hasil pencarian "${query}"`}</p>
          </div>
          <p className="text-muted-foreground">{`Produk yang cocok (${results.length})`}</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 mx-1 mb-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-2 2xl:gap-5 xl:grid-cols-5 3xl:grid-cols-6">
        {isLoadingResults
          ? Array.from({ length: 10 }).map((_, i) => (
              <Card
                key={i}
                className="h-full overflow-hidden border-2 border-black rounded-sm shadow-card"
              >
                <CardHeader className="p-0 border-b-2 border-black">
                  <AspectRatio
                    ratio={4 / 3}
                    className="relative overflow-hidden"
                  >
                    <Skeleton className="w-full h-full" />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="grid gap-2.5 p-4 border-b-2 border-black">
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-20 h-6" />
                  <div className="flex items-center gap-1">
                    <Avatar className="border-2 border-black w-7 h-7">
                      <Skeleton className="w-full h-full rounded-full" />
                    </Avatar>
                    <Skeleton className="w-full h-5" />
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <div className="flex flex-row items-center w-full gap-2">
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                  </div>
                </CardFooter>
              </Card>
            ))
          : results?.map((product) => (
              <ProductCard
                session={session}
                key={product.id}
                productData={product}
              />
            ))}
      </div>
    </div>
  );
};

export default SearchPageClient;
