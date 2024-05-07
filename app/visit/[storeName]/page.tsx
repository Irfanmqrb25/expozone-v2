import getStorebyName from "@/actions/getStoreByName";
import ProductCard from "@/components/card/ProductCard";
import { getCurrentUser } from "@/data/get-user";
import { Sparkles } from "lucide-react";

interface IStoreParams {
  storeName: string;
}

const DetailStorePage = async ({ params }: { params: IStoreParams }) => {
  const session = await getCurrentUser();

  const formatStoreNameUrl = (storeName: string) => {
    return storeName.split("-").join(" ");
  };

  const storeUrl = formatStoreNameUrl(params.storeName);

  const store = await getStorebyName({ storeName: storeUrl });

  const filterFeaturedProducts = store?.products?.filter(
    (product: any) => product.isFeatured === true
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-xl font-medium md:text-3xl">Produk Unggulan</h1>
        </div>
        <p className="md:text-lg text-muted-foreground">
          Produk yang diunggulkan oleh toko ini
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
        {filterFeaturedProducts?.map((product: any) => (
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

export default DetailStorePage;
