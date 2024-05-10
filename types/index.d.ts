import {
  OrderItem,
  Product,
  ProductAsset,
  Review,
  Store,
} from "@prisma/client";

export interface GetOrderItems extends OrderItem {
  product: Product;
  store: Store;
}

export interface OrderItemForDetails extends OrderItem["product"] {
  product: Product & {
    productAssets: ProductAsset[];
    store: Store;
  };
}

export interface ExtendedReviews extends Review {
  user: {
    name: string | null;
    image: string | null;
  };
  product: {
    name: string | null;
    images: string[] | null;
  };
}

export type ProductReview = Review & {
  user: {
    name: string | null;
    image: string | null;
  };
};
