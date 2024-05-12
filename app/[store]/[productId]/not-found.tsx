import NotFound from "@/components/NotFound";

export default function ProductNotFound() {
  return (
    <NotFound
      label="Produk Tidak Ditemukan :("
      src="/assets/product-not-found.svg"
      href="/products"
      buttonLabel="Kembali"
    />
  );
}
