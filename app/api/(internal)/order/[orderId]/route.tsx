import getStore from "@/actions/getStore";
import { db } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const store = await getStore();

    const orderItem = await db.orderItem.findFirst({
      where: {
        storeId: store?.id,
        id: params.orderId,
      },
    });

    if (!orderItem) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.orderItem.delete({
      where: {
        id: params.orderId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
