import { Skeleton } from "../ui/skeleton";

const OrderItemSkeleton = () => {
  return (
    <li className="flex py-3 border-b">
      <div className="relative w-20 h-20 overflow-hidden rounded-md sm:h-24 sm:w-24">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="items-start justify-between flex-1 ml-4 space-y-2 sm:ml-6 sm:space-y-0 sm:flex">
        <div className="space-y-2">
          <Skeleton className="w-full sm:w-[200px] h-5" />
          <Skeleton className="w-full sm:w-[120px] h-5" />
        </div>
        <div>
          <Skeleton className="w-full sm:w-[100px] h-5" />
        </div>
      </div>
    </li>
  );
};

export default OrderItemSkeleton;
