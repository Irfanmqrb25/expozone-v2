import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";
import { getCurrentUser } from "@/data/get-user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  return (
    <>
      <MainNav session={session} />
      <Container>
        <div className="min-h-screen pt-20">{children}</div>
      </Container>
    </>
  );
}
