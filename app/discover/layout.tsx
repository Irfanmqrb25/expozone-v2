import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";

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
      <MainNav session={session} store={store!} />
      <Container>
        <div className="h-full py-20">{children}</div>
      </Container>
    </div>
  );
}
