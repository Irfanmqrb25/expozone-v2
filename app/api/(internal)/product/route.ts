import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/data/get-user";
import getStore from "@/actions/getStore";

export async function POST(request: Request) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session && !store) {
    return NextResponse.json("unauthorized");
  }

  const body = await request.json();
  const {
    name,
    images,
    category,
    description,
    price,
    isFeatured,
    productAssets,
  } = body;

  const product = await db.product.create({
    data: {
      name,
      images,
      category,
      description,
      isFeatured,
      price,
      productAssets: {
        createMany: {
          data: productAssets,
        },
      },
      storeId: store?.id!,
    },
  });
  return NextResponse.json(product);
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session && !store) {
    return NextResponse.json("unauthorized");
  }

  try {
    const product = await db.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[DELETE_PRODUCT_ERROR]", error);
    throw new Error("Failed to delete product.");
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("st") ?? "";
    const decodedQuery = decodeURIComponent(query);

    const products = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: decodedQuery,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: decodedQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        store: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[GET_PRODUCTS_ERROR]", error);
    throw new Error("Failed to get products.");
  }
}
