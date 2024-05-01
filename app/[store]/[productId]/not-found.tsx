import NotFound from "@/components/NotFound";

export default function ProductNotFound() {
  return (
    <NotFound
      label="Product not found"
      src="/assets/product-not-found.svg"
      href="/products"
      buttonLabel="Go back"
    />
  );
}
