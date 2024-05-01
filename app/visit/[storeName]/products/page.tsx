import ProductCard from "@/components/card/ProductCard";

import { getCurrentUser } from "@/data/get-user";
import getStorebyName from "@/actions/getStoreByName";

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

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-medium md:text-3xl">
        Products {`(${store.products.length})`}
      </h1>
      <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
        {store?.products?.map((product: any) => (
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
