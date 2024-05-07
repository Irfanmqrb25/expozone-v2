import React from "react";

import EmptyMessage from "@/components/EmptyMessage";
import ProductCard from "@/components/card/ProductCard";

import { PackageOpen } from "lucide-react";
import { getCurrentUser } from "@/data/get-user";
import getProducts, { IProductParams } from "@/actions/getProducts";

interface HomePageProps {
  searchParams: IProductParams;
}

const ProductsPage = async ({ searchParams }: HomePageProps) => {
  const products = await getProducts(searchParams);
  const session = await getCurrentUser();

  console.log(searchParams);

  if (products?.length === 0) {
    return (
      <EmptyMessage
        title="Produk Tidak Ditemukan"
        description="It seems that there are no products in this category yet"
        icon={PackageOpen}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          productData={product}
          session={session!}
        />
      ))}
    </div>
  );
};

export default ProductsPage;
