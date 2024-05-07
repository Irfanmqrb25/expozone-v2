"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button, buttonVariants } from "../ui/button";
import OrderItemSkeleton from "../skeleton/OrderItemSkeleton";

import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { GetOrderItems } from "@/types";
import type { Order } from "@prisma/client";
import { cn, rupiahFormat } from "@/lib/utils";
import { getOrderItems } from "@/data/get-order";
import { Ban, CreditCard, ShoppingBag, Star, View } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<GetOrderItems[] | null>(null);

  const storeNameInUrl = (name: string) => {
    const storeUrl =
      name.split(" ").length > 1
        ? name.toLocaleLowerCase().replace(/\s+/g, "-")
        : name;

    return storeUrl;
  };

  const onPay = () => {
    if (order.token) {
      // @ts-expect-error
      window.snap.pay(order.token, {
        onSuccess: () => {
          toast.success("Pembayaran berhasil!");
        },
        onPending: () => {
          toast.info("Menunggu pembayaran...");
        },
        onError: () => {
          toast.error("Pembayaran gagal, terjadi kesalahan!");
        },
        onClose: () => {
          toast.info("Kamu belum menyelesaikan pembayaran.");
        },
      });
    }
  };

  const onCancel = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/midtrans/transactions/cancel`, {
        data: {
          orderId: order.id,
        },
      });
      router.push("/orders?status=CANCELED");
      toast.success("Pesanan dibatalkan.");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data);
      }
      toast.error("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getOrderItems(order.id);
        setOrderItems(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [order]);

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
    <div className="h-full p-3 space-y-4 transition-all duration-300 border shadow-md sm:py-4 sm:px-6 hover:shadow-lg rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center">
          <ShoppingBag className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>Pesanan</span>
        </h3>
        {order.status === "PENDING" ? (
          <Badge variant="pending" className="capitalize">
            Tertunda
          </Badge>
        ) : order.status === "PAID" ? (
          <Badge variant="success" className="capitalize">
            Berhasil
          </Badge>
        ) : (
          <Badge variant="destructive" className="capitalize">
            Dibatalkan
          </Badge>
        )}
      </div>
      <Separator className="mt-4" />
      <div>
        <ul>
          {!isLoading ? (
            orderItems?.map((item, i) => (
              <li key={i} className="flex py-3 border-b">
                <div className="relative w-20 h-20 overflow-hidden rounded-md sm:h-24 sm:w-24">
                  <Image
                    fill
                    src={item.product.images[0]}
                    alt="fasfasd"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <Link
                      href={`/${storeNameInUrl(item.store.name)}/${
                        item.productId
                      }`}
                      className="font-semibold text-black sm:text-lg line-clamp-2"
                    >
                      {item.product.name}
                    </Link>

                    <div className="font-medium text-orange-500 sm:text-right">
                      {rupiahFormat(Number(item.product.price))}
                    </div>

                    <p className="text-sm text-gray-500 capitalize sm:text-base">
                      {item.store.name}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <OrderItemSkeleton />
          )}
          <div className="flex items-center justify-between py-3">
            <p className="mr-2 font-bold sm:text-xl">Total Harga :</p>
            <p className="font-bold text-right">
              {rupiahFormat(Number(order.totalPrice))}
            </p>
          </div>
        </ul>
        {order.status !== "CANCELED" && (
          <div className="flex flex-col space-y-6">
            <Separator />
            <div className="flex justify-end">
              {order.status === "PENDING" && (
                <div className="flex justify-end gap-3">
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isLoading}
                    onClick={onCancel}
                    className="flex items-center gap-1 min-w-[100px]"
                  >
                    <Ban size={17} />
                    Batalkan
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-1 min-w-[100px]"
                    onClick={onPay}
                    disabled={isLoading}
                  >
                    <CreditCard size={17} />
                    Bayar
                  </Button>
                </div>
              )}
              {order.status === "PAID" && (
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/orders/${order.id}`}
                    aria-disabled={isLoading}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "flex items-center gap-1 min-w-[100px]"
                    )}
                  >
                    <View size={17} />
                    Detil
                  </Link>
                  <Link
                    href={`/store`}
                    aria-disabled={isLoading}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "flex items-center gap-1 min-w-[100px]"
                    )}
                  >
                    <Star size={17} />
                    Ulas
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderItem;
