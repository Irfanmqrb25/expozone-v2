const orderId = require("order-id")("key");
const midtransClient = require("midtrans-client");

import * as z from "zod";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/data/get-user";
import { CheckoutSchema } from "@/lib/validations/checkout";

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { productIds, totalPrice } = CheckoutSchema.parse(body);

    if (!productIds || productIds.length === 0) {
      return new Response("Product ids are required.", { status: 400 });
    }

    if (!totalPrice) {
      return new Response("Total price is required.", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const order_id = orderId.generate();

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id,
        gross_amount: Number(totalPrice),
      },
      credit_card: {
        secure: true,
      },
      item_details: products.map((product) => ({
        id: product.id,
        price: Number(product.price),
        quantity: 1,
        name: product.name,
        merchant_id: product.storeId,
      })),
      customer_details: {
        first_name: session.name,
        email: session.email,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/orders`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/orders`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/orders`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    await db.order.create({
      data: {
        id: order_id,
        userId: session?.id,
        totalPrice: Number(totalPrice),
        status: "PENDING",
        token: transaction.token,
        orderItems: {
          create: products.map((product) => ({
            product: {
              connect: {
                id: product.id,
              },
            },
            store: {
              connect: {
                id: product.storeId,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not create transaction, try again", {
      status: 500,
    });
  }
}
