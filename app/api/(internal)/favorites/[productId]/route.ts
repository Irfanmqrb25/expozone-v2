import { NextResponse } from "next/server";
import { getCurrentUser } from "@/data/get-user";
import { db } from "@/lib/prisma";

interface IParams {
  productId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(session.favoriteIds || [])];

  favoriteIds.push(productId);

  const user = await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(session.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== productId);

  const user = await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
