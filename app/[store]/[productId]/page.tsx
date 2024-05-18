import { notFound } from "next/navigation";

import DetailProductPageClient from "./DetailProductPageClient";

import { getCurrentUser } from "@/data/get-user";
import getProductById from "@/actions/getProductById";
import { getProductReviews } from "@/data/get-review";

interface IProductParams {
  productId: string;
  store: string;
}

const DetailProductPage = async ({ params }: { params: IProductParams }) => {
  const session = await getCurrentUser();
  const product = await getProductById(params);
  const reviews = await getProductReviews(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <DetailProductPageClient
      product={product}
      storeName={params.store}
      session={session!}
      reviews={reviews}
    />
  );
};

export default DetailProductPage;
