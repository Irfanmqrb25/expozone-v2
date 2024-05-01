import getOrderByStore from "@/actions/getOrderItemByStore";
import getStore from "@/actions/getStore";
import OrderTable from "@/components/table/OrderTable";

const OrdersPage = async () => {
  const store = await getStore();
  const orderData = await getOrderByStore(store!);

  return <OrderTable store={store!} orderData={orderData} />;
};

export default OrdersPage;
