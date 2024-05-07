import Link from "next/link";

import { Card } from "@/components/ui/card";
import ProductCard from "@/components/card/ProductCard";
import FeaturedCarousel from "@/components/carousel/FeaturedCarousel";

import { ChevronRightIcon } from "lucide-react";
import { getCurrentUser } from "@/data/get-user";
import {
  getBestSellingProducts,
  getFeaturedProduct,
  getNewProduct,
} from "@/data/get-product";

const FeaturedPage = async () => {
  const user = await getCurrentUser();
  const newProducts = getNewProduct();
  const topProducts = getBestSellingProducts();

  const [NewProducts, TopProducts] = await Promise.all([
    newProducts,
    topProducts,
  ]);

  return (
    <div className="flex flex-col h-full gap-5">
      <div>
        <FeaturedCarousel />
      </div>
      <div className="flex flex-col gap-4 mt-5 text-center">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Selamat Datang Di Expozone
        </h1>
        <p className="px-0 md:text-lg lg:px-48 text-muted-foreground">
          Expozone - Tempat Keren untuk Menjelajahi Produk Digital yang
          Mengagumkan! Temukan Ragam Pilihan dan Diskon Tak Terduga. Rasakan
          Sensasi Belanja Online yang Gak Bikin Ribet di Sini. Temukan
          Kemudahan, Ragam, dan Hemat di Expozone, Surga Belanja Digitalmu.
        </p>
      </div>
      <Card className="flex flex-col py-16 text-center border-2 border-black my-shadow my-14 gap-7">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Jual Atau Beli Produk Digital Yang Anda Inginkan Disini!
        </h1>
        <div className="flex items-center justify-center w-full gap-2">
          <Link
            href={"/store"}
            className="inline-flex items-center justify-center px-3 text-sm font-medium transition-colors border-2 border-black rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-9"
          >
            Buat Toko
          </Link>
          <Link
            href={"/products"}
            className="inline-flex items-center justify-center px-3 text-sm font-medium transition-colors rounded-md h-9 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            Beli Produk
          </Link>
        </div>
      </Card>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium md:text-3xl">Produk Terbaru</h1>
            <Link
              href="/discover/search?st=new-arrival"
              className="flex items-center"
            >
              Lihat Semua
              <ChevronRightIcon size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
            {NewProducts?.map((product) => (
              <ProductCard
                key={product.id}
                productData={product}
                session={user!}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium md:text-3xl">Penjualan Terbaik</h1>
          <Link
            href="/discover/search?st=best-selling"
            className="flex items-center"
          >
            Lihat Semua
            <ChevronRightIcon size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
          {TopProducts?.map((product) => (
            <ProductCard
              key={product.id}
              productData={product}
              session={user!}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;
