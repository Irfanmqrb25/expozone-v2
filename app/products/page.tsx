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

  return (
    <>
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 mx-1 mb-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-2 2xl:gap-5 xl:grid-cols-5 3xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productData={product}
              session={session!}
            />
          ))}
        </div>
      ) : (
        <EmptyMessage
          title="Produk Tidak Ditemukan"
          description="It seems that there are no products in this category yet"
          icon={PackageOpen}
        />
      )}
    </>
  );
};

export default ProductsPage;
