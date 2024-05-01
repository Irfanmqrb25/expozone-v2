import { OrderItem, Product, ProductAsset, Store } from "@prisma/client";

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
