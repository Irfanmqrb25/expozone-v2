import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/data/get-user";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log("[PRODUCT_DELETE]", error);
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const user = await getCurrentUser();

  try {
    const body = await req.json();

    const {
      name,
      price,
      category,
      images,
      isFeatured,
      description,
      productAssets,
    } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Image are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!category) {
      return new NextResponse("Category is required", { status: 400 });
    }

    if (!productAssets) {
      return new NextResponse("Product assets is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        images,
        category,
        price,
        description,
        isFeatured,
        productAssets: {
          deleteMany: {},
        },
      },
    });

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        productAssets: {
          createMany: {
            data: productAssets,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log("[PRODUCT_PATCH]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
