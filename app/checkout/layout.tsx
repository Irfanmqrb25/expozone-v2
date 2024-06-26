import MainNav from "../../components/navbar/MainNav";
import Container from "../../components/Container";

import getStore from "@/actions/getStore";
import { getCurrentUser } from "@/data/get-user";

const CheckoutLayout = async ({ children }: { children: React.ReactNode }) => {
  const store = await getStore();
  const session = await getCurrentUser();

  return (
    <div>
      <MainNav session={session} store={store!} />
      <Container>
        <div className="min-h-screen pt-20">{children}</div>
      </Container>
    </div>
  );
};

export default CheckoutLayout;
