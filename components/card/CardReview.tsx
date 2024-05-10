import Image from "next/image";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";

import { format } from "date-fns";
import id from "date-fns/locale/id";
import { ExtendedReviews } from "@/types";
import Link from "next/link";

interface CardReviewProps {
  review: ExtendedReviews;
}

const CardReview = ({ review }: CardReviewProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={review.user.image || "/blank-user.jpg"}
              alt="image user"
            />
          </Avatar>
          <h6 className="font-medium">{review.user.name}</h6>
        </div>
        <p className="text-sm text-muted-foreground">
          Diulas pada{" "}
          {format(new Date(review.createdAt), "dd MMMM yyyy", { locale: id })}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Link
          href={`/products/${review.productId}`}
          className="flex items-center gap-2"
        >
          <div className="relative w-20 h-20 overflow-hidden rounded-md">
            <Image
              fill
              src={review.product.images?.[0] || "/blank-image.jpg"}
              alt="image product"
              className="object-cover object-center"
            />
          </div>
          <p className="font-medium">{review.product.name}</p>
        </Link>
        <p>{review.message}</p>
      </CardContent>
    </Card>
  );
};

export default CardReview;
