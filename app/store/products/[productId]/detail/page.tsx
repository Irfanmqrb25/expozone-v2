import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AssetCard from "@/components/card/AssetCard";
import { Separator } from "@/components/ui/separator";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";

import { Rupiah } from "@jetmiky/rupiahjs";
import getProductById from "@/actions/getProductById";
import getStore from "@/actions/getStore";
import { redirect } from "next/navigation";

interface IProductParams {
  productId: string;
}

const ViewProductDetailPage = async ({
  params,
}: {
  params: IProductParams;
}) => {
  const store = await getStore();
  const product = await getProductById(params);

  if (product?.storeId !== store?.id) {
    return redirect("/featured");
  }

  const price = new Rupiah(Number(product?.price));
  const isProductOwner = product?.storeId === store?.id;

  return (
    <div className="container px-0">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product?.images ?? []}
          options={{
            loop: true,
          }}
        />
        <div className="flex flex-col w-full gap-4 md:w-1/2">
          <p className="text-3xl font-medium">{product?.name}</p>
          <p className="text-gray-400">{price.getCurrency("Rp", "dot")}</p>
          <Separator />
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="description"
          >
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>{product?.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-col gap-4">
            <p className="font-medium">Assets</p>
            <div className="flex flex-col gap-3 md:flex-row">
              {product?.productAssets?.map((asset) => (
                <AssetCard
                  key={asset.id}
                  assetData={asset}
                  type="publish"
                  isOwnProduct={isProductOwner}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetailPage;
