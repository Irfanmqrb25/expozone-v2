import { getCurrentUser } from "@/data/get-user";
import { db } from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return new Response("Order id is required.", { status: 400 });
    }

    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    if (order.userId !== session.id) {
      return new Response("Forbidden", { status: 403 });
    }

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELED",
      },
    });

    const url = `https://api.sandbox.midtrans.com/v2/${order.id}/cancel`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization:
          "Basic U0ItTWlkLXNlcnZlci1sRElUNmpNVDhYSl82c29KeGlNQnhCeXc6",
      },
    };

    await fetch(url, options);

    return new Response("OK");
  } catch (error) {
    console.log(error);
  }
}
