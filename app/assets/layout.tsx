import CreateStoreModal from "@/components/modal/CreateStoreModal";
import { getCurrentUser } from "@/data/get-user";
import getStore from "@/actions/getStore";
import MainNav from "@/components/navbar/MainNav";
import Container from "@/components/Container";

export default async function AssetsLayout({
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
        <div className="min-h-screen pt-20">{children}</div>
      </Container>
    </>
  );
}
