import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/data/get-user";
import getStore from "@/actions/getStore";

export async function POST(request: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { name, image, email, country, city, address, description } = body;

  if (!name || !country || !city || !address || !description)
    return NextResponse.json("All fields are required", { status: 400 });

  const storeExists = await db.store.findUnique({
    where: {
      name: name,
    },
  });

  if (storeExists) {
    return NextResponse.json("Nama toko sudah digunakan", { status: 400 });
  }

  const store = await db.store.create({
    data: {
      name,
      image,
      email,
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
    return NextResponse.json("All fields are required", { status: 400 });

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
    return NextResponse.json("unauthorized", { status: 401 });
  }

  await db.store.delete({
    where: { id: store?.id },
  });

  return NextResponse.json({ message: "Store deleted" });
}
