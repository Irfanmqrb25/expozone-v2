import ProductCard from "@/components/card/ProductCard";

import { getCurrentUser } from "@/data/get-user";
import getStorebyName from "@/actions/getStoreByName";
import { Package2 } from "lucide-react";
import { Product, Store } from "@prisma/client";

interface IStoreParams {
  storeName: string;
}

const ProducStorePage = async ({ params }: { params: IStoreParams }) => {
  const session = await getCurrentUser();

  const capitalizeWords = (str: any) => {
    return str.split("-").join(" ");
  };
  const storeUrl = capitalizeWords(params.storeName);

  const store = await getStorebyName({ storeName: storeUrl });

  console.log(store.products);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Package2 className="w-6 h-6" />
          <h1 className="text-xl font-medium md:text-3xl">Produk</h1>
        </div>
        <p className="md:text-lg text-muted-foreground">
          Semua produk yang ada di toko ini
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
        {store?.products?.map((product: Product & { store: Store }) => (
          <ProductCard
            key={product.id}
            productData={product}
            session={session!}
          />
        ))}
      </div>
    </div>
  );
};

export default ProducStorePage;
