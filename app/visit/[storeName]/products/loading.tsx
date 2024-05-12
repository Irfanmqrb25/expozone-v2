import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const loading = () => {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-[200px] h-6" />
        </div>
        <div>
          <Skeleton className="w-[250px] h-3 rounded-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="w-full md:max-w-[300px] overflow-hidden">
            <div>
              <Skeleton className="object-cover w-full h-[270px] md:h-[210px] rounded-none" />
            </div>
            <CardContent className="py-4 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-full h-6" />
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-full h-3 rounded-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-8">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default loading;
