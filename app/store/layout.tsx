import Image from "next/image";
import StoreTabs from "../../components/tabs/StoreTabs";
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
    <div className="h-full">
      <CreateStoreModal />
      <MainNav session={session} store={store!} />
      <Container>
        <div className="h-full pt-16">
          {store && (
            <div className="mb-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 overflow-hidden border-2 border-gray-300 rounded-full md:w-10 md:h-10">
                  <Image
                    src={store?.image || "/assets/blank-user.jpg"}
                    alt="Store Profile"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <p className="text-2xl font-medium">{store?.name}</p>
              </div>
              <StoreTabs />
            </div>
          )}
          {children}
        </div>
      </Container>
    </div>
  );
}
