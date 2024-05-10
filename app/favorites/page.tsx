import ProductCard from "@/components/card/ProductCard";
import EmptyMessage from "@/components/EmptyMessage";

import { TbHeartOff } from "react-icons/tb";
import { BsBox2Heart } from "react-icons/bs";
import getFavoriteProducts from "@/actions/getFavorites";
import { getCurrentUser } from "@/data/get-user";

const FavoritesPage = async () => {
  const session = await getCurrentUser();
  const favorites = await getFavoriteProducts();

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2">
          <BsBox2Heart size={26} />
          <h1 className="text-xl font-bold tracking-tight text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text">
            Favorit Saya
          </h1>
        </div>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          Lihat semua produk favorit anda
        </p>
      </div>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 mx-1 md:gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              productData={product}
              session={session!}
            />
          ))}
        </div>
      ) : (
        <EmptyMessage
          icon={TbHeartOff}
          title="Tidak ada produk favorit"
          description="Coba tambahkan produk yang kamu sukai"
        />
      )}
    </div>
  );
};

export default FavoritesPage;
