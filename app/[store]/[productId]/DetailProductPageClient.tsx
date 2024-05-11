"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import AssetCard from "@/components/card/AssetCard";
import { Separator } from "@/components/ui/separator";
import FavoriteButton from "@/components/FavoriteButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";

import { toast } from "sonner";
import { format } from "date-fns";
import useCart from "@/hooks/useCart";
import { Loader2 } from "lucide-react";
import { ProductReview } from "@/types";
import axios, { AxiosError } from "axios";
import { Rupiah } from "@jetmiky/rupiahjs";
import { ExtendedSession } from "@/next-auth";
import { BsArrowUpRight } from "react-icons/bs";
import { BiMessageSquareDots } from "react-icons/bi";
import { Product, ProductAsset, Review, Store } from "@prisma/client";

interface DetailProductPageClientProps {
  product: Product & {
    store: Store;
    productAssets: ProductAsset[];
  };
  session: ExtendedSession;
  reviews: ProductReview[];
}

const DetailProductPageClient: React.FC<DetailProductPageClientProps> = ({
  product,
  session,
  reviews,
}) => {
  const cart = useCart();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const storeUrl =
    product.store.name.split(" ").length > 1
      ? product.store.name.replace(/\s+/g, "-")
      : product.store.name;

  const price = new Rupiah(Number(product.price));

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    cart.addItem(product);
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/midtrans/transactions", {
        productIds: [product.id],
        totalPrice: product.price,
      });
      setToken(response.data.token);
      cart.removeAll();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      // @ts-expect-error
      window.snap.pay(token, {
        onSuccess: () => {
          router.push("/orders");
          toast.success("Pembayaran berhasil!");
        },
        onPending: () => {
          router.push("/orders");
          toast("Menunggu pembayaran...");
        },
        onError: () => {
          toast.error("Pembayaran gagal, terjadi kesalahan!");
        },
        onClose: () => {
          router.push("/orders");
          toast.error("Kamu belum menyelesaikan pembayaran.");
        },
      });
    }
  }, [token, router]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;
    scriptTag.setAttribute("data-client-key", process.env.MIDTRANS_CLIENT_KEY!);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="container px-0 space-y-12">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product?.images ?? []}
          options={{
            loop: true,
          }}
        />
        <div className="flex flex-col w-full gap-4 md:w-1/2">
          <Link href={`/visit/${storeUrl}`} className="hover:bg-gray-100">
            <div className="flex items-center justify-between w-full px-2 py-2 border border-gray-00">
              <div className="flex items-center gap-2">
                <Avatar className="border border-gray-300 w-9 h-9">
                  <AvatarImage
                    loading="lazy"
                    src={product?.store?.image || "/assets/blank-user.jpg"}
                    alt="avatar"
                  />
                </Avatar>
                <span className="text-lg font-medium">
                  {product?.store?.name}
                </span>
              </div>
              <div className="flex items-center gap-1 mr-2 cursor-pointer">
                <BsArrowUpRight className="text-sm" />
              </div>
            </div>
          </Link>
          <p className="text-3xl font-medium">{product?.name}</p>
          <p className="text-gray-400">{price.getCurrency("Rp", "dot")}</p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                className="flex items-center h-8 gap-2 text-xs"
                disabled={loading}
                onClick={() => handleCheckOut()}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Beli sekarang
              </Button>
              <Button
                variant="outline"
                className="h-8 text-xs"
                onClick={handleAddToCart}
              >
                Tambah ke keranjang
              </Button>
            </div>
            <FavoriteButton productId={product.id} session={session} />
          </div>
          <Separator />
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="description"
          >
            <AccordionItem value="description">
              <AccordionTrigger>Deskripsi</AccordionTrigger>
              <AccordionContent>{product?.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-col gap-4">
            <p className="font-medium">Aset</p>
            <div className="flex flex-col gap-3 md:flex-row">
              {product?.productAssets?.map((asset) => (
                <AssetCard key={asset.id} assetData={asset} type="publish" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-1">
          <BiMessageSquareDots className="w-5 h-5 lg:w-7 lg:h-7" />
          <h5 className="text-lg font-semibold md:text-xl lg:text-2xl">
            Ulasan Produk
          </h5>
        </div>
        <div className="flex flex-col gap-2">
          {reviews.map((review) => (
            <div className="py-4 space-y-2 border-b" key={review.id}>
              <div className="flex items-center gap-2">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={review.user.image || "/blank-user.jpg"} />
                </Avatar>
                <div>
                  <p className="font-medium">{review.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(review.createdAt), "dd/MM/yyyy")}
                  </p>
                </div>
              </div>
              <p>{review.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProductPageClient;
