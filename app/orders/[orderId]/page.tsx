import OrderDetails from "@/components/order/OrderDetails";
import { Badge } from "@/components/ui/badge";
import { getUserOrderItemsDetails } from "@/data/get-order";

const OrderDetailsPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const orderItems = await getUserOrderItemsDetails(params.orderId);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Detail Pemesanan</h1>
          <p className="text-muted-foreground">ID: {params.orderId}</p>
        </div>
        <Badge variant="success" className="capitalize">
          Berhasil
        </Badge>
      </div>
      <OrderDetails data={orderItems} />
    </div>
  );
};

export default OrderDetailsPage;
