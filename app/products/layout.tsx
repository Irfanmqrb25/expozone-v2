import Filter from "@/components/input/Filter";
import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";
import CreateStoreModal from "@/components/modal/CreateStoreModal";

import { BsBox2 } from "react-icons/bs";
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
              <div className="flex items-center gap-2">
                <BsBox2 size={22} strokeWidth={0.5} />
                <h1 className="text-xl font-bold tracking-tight text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text">
                  Produk
                </h1>
              </div>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Jelajahi koleksi produk digital yang berkualitas tinggi pada
                toko.
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
