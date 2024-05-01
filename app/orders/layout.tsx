import { getCurrentUser } from "@/data/get-user";
import getStore from "@/actions/getStore";
import MainNav from "@/components/navbar/MainNav";
import Container from "@/components/Container";
import OrderTabs from "@/components/tabs/OrderTabs";
import { useSearchParams } from "next/navigation";

const OrdersLayout = async ({ children }: { children: React.ReactNode }) => {
  const store = await getStore();
  const session = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <MainNav session={session} store={store!} />
      <Container>
        <div className="pt-16">{children}</div>
      </Container>
    </div>
  );
};

export default OrdersLayout;
