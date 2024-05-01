import ProductCard from "@/components/card/ProductCard";
import EmptyMessage from "@/components/EmptyMessage";

import { TbHeartOff } from "react-icons/tb";

import getFavoriteProducts from "@/actions/getFavorites";
import { getCurrentUser } from "@/data/get-user";

const FavoritesPage = async () => {
  const session = await getCurrentUser();
  const favorites = await getFavoriteProducts();

  if (favorites.length === 0) {
    return (
      <EmptyMessage
        icon={TbHeartOff}
        title="There are no favorites"
        description="Looks like you haven't added favorite products yet"
      />
    );
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold md:text-3xl">
        My Favorites {`(${favorites.length})`}
      </h1>
      <div className="grid grid-cols-1 gap-5 mx-1 md:gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            session={session!}
          />
        ))}
      </div>
    </>
  );
};

export default FavoritesPage;
