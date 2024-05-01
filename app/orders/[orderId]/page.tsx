import OrderDetails from "@/components/order/OrderDetails";
import { getUserOrderItemsDetails } from "@/data/get-order";

const OrderDetailsPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const orderItems = await getUserOrderItemsDetails(params.orderId);

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <p className="text-muted-foreground">ID: {params.orderId}</p>
      </div>
      <OrderDetails data={orderItems} />
    </div>
  );
};

export default OrderDetailsPage;
