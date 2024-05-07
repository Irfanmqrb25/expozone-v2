import CheckoutList from "@/components/checkout/CheckoutList";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col space-y-12">
      <h1 className="text-xl font-bold tracking-tight text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text">
        Keranjang Pembelian
      </h1>
      <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
        <CheckoutList />
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
