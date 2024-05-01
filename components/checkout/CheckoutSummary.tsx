"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import { toast } from "sonner";
import useCart from "@/hooks/useCart";
import axios, { AxiosError } from "axios";
import { rupiahFormat } from "@/lib/utils";

const CheckoutSummary = () => {
  const cart = useCart();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const handleCheckOut = async () => {
    try {
      const productIds = cart.items.map((item) => item.id);
      const response = await axios.post("/api/midtrans/transactions", {
        productIds,
        totalPrice,
      });
      setToken(response.data.token);
      cart.removeAll();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    }
  };

  useEffect(() => {
    if (token) {
      // @ts-expect-error
      window.snap.pay(token, {
        onSuccess: () => {
          router.push("/orders");
          toast.success("Payment success!");
        },
        onPending: () => {
          router.push("/orders");
          toast("Waiting your payment..");
        },
        onError: () => {
          toast.error("Payment failed, something went wrong");
        },
        onClose: () => {
          router.push("/orders");
          toast.error("You have not completed the payment.");
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="px-4 py-6 bg-gray-100 border border-black rounded-lg sm:p-6 lg:col-span-5 lg:p-8 my-shadow">
      <h3 className="text-lg font-medium">Order Summary</h3>
      <div className="mt-6 space-y-4">
        <div>
          {cart.items.map((item) => (
            <div className="flex items-center justify-between" key={item.id}>
              <p>{item.name}</p>
              <p>{rupiahFormat(Number(item.price))}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-black">
          <p className="text-base font-medium text-gray-900">Order total</p>
          {rupiahFormat(totalPrice)}
        </div>
        <Button onClick={() => handleCheckOut()} className="w-full mt-6 ">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
