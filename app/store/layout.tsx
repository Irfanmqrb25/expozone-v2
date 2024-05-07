import Image from "next/image";
import StoreTabs from "../../components/tabs/StoreTabs";
import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";
import CreateStoreModal from "@/components/modal/CreateStoreModal";

import getStore from "@/actions/getStore";
import { getCurrentUser } from "@/data/get-user";
import { Store } from "lucide-react";

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
              <div>
                <div className="flex items-center gap-2">
                  <Store size={26} />
                  <h1 className="text-xl font-bold tracking-tight text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text">
                    Toko Saya
                  </h1>
                </div>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Kelola toko dan produk anda.
                </p>
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
