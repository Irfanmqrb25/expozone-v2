import MainNav from "@/components/navbar/MainNav";
import NotFound from "@/components/NotFound";
import { getCurrentUser } from "@/data/get-user";

export default async function StoreNotFound() {
  const session = await getCurrentUser();
  return (
    <div className="min-h-screen">
      <MainNav session={session} />
      <NotFound
        label="Toko Tidak Ditemukan :("
        src="/assets/store-not-found.png"
        href="/products"
        buttonLabel="Kembali"
      />
    </div>
  );
}
