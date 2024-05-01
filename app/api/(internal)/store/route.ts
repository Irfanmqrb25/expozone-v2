import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/data/get-user";
import getStore from "@/actions/getStore";

export async function POST(request: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("unauthorized");
  }

  const body = await request.json();
  const { name, image, email, country, city, address, description } = body;

  const store = await db.store.create({
    data: {
      name,
      image,
      email,
      // country: country.label,
      country,
      city,
      address,
      description,
      userId: session.id,
    },
  });

  return NextResponse.json(store);
}

export async function PUT(request: Request) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session) {
    return NextResponse.json("unauthorized");
  }
  const body = await request.json();
  const { name, image, email, country, city, address, description } = body;

  if (!name || !image || !country || !city || !address || !description)
    return NextResponse.json("All fields are required");

  const updatedStore = await db.store.update({
    where: { id: store?.id },
    data: {
      name,
      image,
      email,
      country,
      city,
      address,
      description,
    },
  });

  return NextResponse.json(updatedStore);
}

export async function DELETE(request: Request) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session) {
    return NextResponse.json("unauthorized");
  }

  await db.store.delete({
    where: { id: store?.id },
  });

  return NextResponse.json({ message: "Store deleted" });
}
