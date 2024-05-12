import { Skeleton } from "@/components/ui/skeleton";

const DetailProductPageLoading = () => {
  return (
    <div className="px-0 space-y-12">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="flex flex-col w-full gap-2 md:w-1/2 2xl:w-1/3">
          <Skeleton className="min-w-0 pl-4 aspect-square" />
          <div className="flex items-center justify-center w-full gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full h-full max-w-[70px] md:max-w-[100px] aspect-square"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 md:w-1/2 2xl:w-[66.7%]">
          <div className="flex items-center justify-between w-full px-2 py-2 border rounded-md">
            <div className="flex items-center gap-2">
              <Skeleton className="rounded-full w-9 h-9" />
              <Skeleton className="w-[200px] h-5" />
            </div>
            <div className="flex items-center gap-1 mr-2">
              <Skeleton className="w-6 h-6" />
            </div>
          </div>
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-[200px] h-6" />
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-[80px] h-8" />
              <Skeleton className="w-[80px] h-8" />
            </div>
            <Skeleton className="w-8 h-8" />
          </div>
          <Skeleton className="w-full h-0.5" />
          <div className="flex flex-col gap-4">
            <Skeleton className="w-[200px] h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-0.5" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="w-[200px] h-6" />
            <div className="flex flex-col gap-3 md:flex-row">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="w-full md:w-[200px] h-[200px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-0.5" />
      <div className="space-y-4">
        <div className="flex items-center gap-1">
          <Skeleton className="w-5 h-5 lg:w-7 lg:h-7" />
          <Skeleton className="w-[200px] h-7" />
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div className="py-4 space-y-2 border-b" key={i}>
            <div className="flex items-center gap-2">
              <Skeleton className="rounded-full w-9 h-9" />
              <div className="space-y-1">
                <Skeleton className="w-[200px] h-6" />
                <Skeleton className="w-[120px] h-3 rounded-sm" />
              </div>
            </div>
            <Skeleton className="w-full h-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailProductPageLoading;
