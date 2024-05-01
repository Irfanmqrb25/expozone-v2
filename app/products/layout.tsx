import Filter from "@/components/input/Filter";
import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";
import CreateStoreModal from "@/components/modal/CreateStoreModal";

import getStore from "@/actions/getStore";
import { getCurrentUser } from "@/data/get-user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await getStore();
  const session = await getCurrentUser();

  return (
    <>
      <CreateStoreModal />
      <MainNav session={session} store={store!} />
      <Container>
        <div className="flex flex-col min-h-screen gap-5 pt-20">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p className="text-3xl font-medium">Products</p>
              <p className="text-muted-foreground">
                Buy the product you need here.
              </p>
            </div>
            <div className="mt-2">
              <Filter />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </Container>
    </>
  );
}
