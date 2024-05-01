import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import FormUpdateProduct from "./FormUpdateProduct";
import getProductById from "@/actions/getProductById";
import { db } from "@/lib/prisma";

const ProductUpdatePage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productData = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      productAssets: true,
    },
  });

  console.log(productData);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Update Product</CardTitle>
        <CardDescription>Update your product data</CardDescription>
      </CardHeader>
      <CardContent>
        <FormUpdateProduct data={productData!} />
      </CardContent>
    </Card>
  );
};

export default ProductUpdatePage;
