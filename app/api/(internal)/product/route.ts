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

  if (!name || !category || !description || !price || !productAssets) {
    return NextResponse.json("All fields are required", { status: 400 });
  }

  await db.product.create({
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
  return NextResponse.json("Produk berhasil ditambahkan");
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

    if (decodedQuery === "new-arrival") {
      const products = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          store: true,
        },
        take: 20,
      });
      return NextResponse.json(products);
    }

    if (decodedQuery === "best-selling") {
      const bestSellingProducts = await db.orderItem.groupBy({
        by: ["productId"],
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: "desc",
          },
        },
        take: 20,
      });

      const productIds = bestSellingProducts.map((item) => item.productId);

      const topProducts = await db.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
        include: {
          store: true,
        },
      });

      const sortedTopProducts = bestSellingProducts.map(
        (bestSellingProduct) => {
          return topProducts.find(
            (product) => product.id === bestSellingProduct.productId
          );
        }
      );

      return NextResponse.json(sortedTopProducts);
    }

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
