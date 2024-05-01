import { notFound } from "next/navigation";

import DetailProductPageClient from "./DetailProductPageClient";

import { getCurrentUser } from "@/data/get-user";
import getProductById from "@/actions/getProductById";

interface IProductParams {
  productId: string;
}

const DetailProductPage = async ({ params }: { params: IProductParams }) => {
  const product = await getProductById(params);
  const session = await getCurrentUser();

  if (!product) {
    notFound();
  }
  return <DetailProductPageClient product={product} session={session!} />;
};

export default DetailProductPage;
