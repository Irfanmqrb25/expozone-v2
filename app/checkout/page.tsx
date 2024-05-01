import CheckoutList from "@/components/checkout/CheckoutList";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col space-y-12">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
        <CheckoutList />
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
