import { Skeleton } from "@/components/ui/skeleton";

const DetailProductPageLoading = () => {
  return (
    <div>
      <Skeleton className="w-[250px] h-4 mb-5" />
      <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
        <div className="flex flex-col gap-2 w-full md:w-[40%]">
          <div className="relative overflow-hidden border-2 border-black rounded-sm aspect-square">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex items-center justify-between w-full px-2 py-2 border-2 border-black rounded-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="rounded-full w-9 h-9" />
              <Skeleton className="w-[200px] h-5" />
            </div>
            <div className="flex items-center gap-1 mr-2 cursor-pointer">
              <Skeleton className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-[40%] gap-5 w-full">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-[400px] h-10" />
            <Skeleton className="w-[100px] h-4" />
          </div>
          <div className="flex items-center text-xl text-gray-400">
            <Skeleton className="w-[80px] h-4" />
          </div>
          <Skeleton className="w-full h-[1.5px]" />
          <Skeleton className="w-full h-10" />
          <div className="flex items-center gap-4">
            <Skeleton className="w-full h-7" />
            <Skeleton className="w-full h-7" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPageLoading;
