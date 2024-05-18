import EmptyMessage from "@/components/EmptyMessage";
import CardReview from "@/components/card/CardReview";

import { TbMessage2Off } from "react-icons/tb";
import { getStoreProductReviews } from "@/data/get-review";
import { BiMessageSquareDots } from "react-icons/bi";
import { formatStoreNameUrl } from "@/lib/utils";

interface IStoreParams {
  storeName: string;
}

const StoreReviewPage = async ({ params }: { params: IStoreParams }) => {
  const storeUrl = formatStoreNameUrl(params.storeName);

  const reviews = await getStoreProductReviews(storeUrl);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <BiMessageSquareDots className="w-6 h-6" />
          <h1 className="text-xl font-medium md:text-3xl">Ulasan</h1>
        </div>
        <p className="md:text-lg text-muted-foreground">
          Ulasan produk yang ada di toko ini
        </p>
      </div>
      <div className="flex flex-col min-h-screen gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <CardReview review={review} key={review.id} />
          ))
        ) : (
          <EmptyMessage
            icon={TbMessage2Off}
            title="Tidak ada ulasan"
            description="Toko ini belum memiliki ulasan produk."
          />
        )}
      </div>
    </div>
  );
};

export default StoreReviewPage;
