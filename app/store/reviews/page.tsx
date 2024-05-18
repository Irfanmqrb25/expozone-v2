import CardReview from "@/components/card/CardReview";
import EmptyMessage from "@/components/EmptyMessage";

import getStore from "@/actions/getStore";
import { TbMessage2Off } from "react-icons/tb";
import { getStoreProductReviews } from "@/data/get-review";

const StoreReviewsPage = async () => {
  const store = await getStore();
  const reviews = await getStoreProductReviews(store?.name!);

  return (
    <div className="flex flex-col min-h-screen gap-4">
      {reviews.length > 0 ? (
        reviews.map((review) => <CardReview review={review} key={review.id} />)
      ) : (
        <EmptyMessage
          icon={TbMessage2Off}
          title="Tidak ada ulasan"
          description="Toko ini belum memiliki ulasan produk."
        />
      )}
    </div>
  );
};

export default StoreReviewsPage;
