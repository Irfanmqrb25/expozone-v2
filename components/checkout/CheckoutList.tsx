"use client";

import useCart from "@/hooks/useCart";
import CheckoutItem from "./CheckoutItem";
import { useEffect, useState } from "react";

const CheckoutList = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="lg:col-span-7">
      {cart.items.length > 0 ? (
        <ul>
          {cart.items.map((item) => (
            <CheckoutItem key={item.id} productData={item} />
          ))}
        </ul>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default CheckoutList;
