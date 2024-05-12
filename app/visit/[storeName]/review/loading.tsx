import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
      <div className="flex flex-col min-h-screen gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-24 h-6" />
              </div>
              <Skeleton className="w-[100px] h-4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative w-20 h-20 overflow-hidden rounded-md">
                  <Skeleton className="w-full h-full" />
                </div>
                <Skeleton className="w-[200px] h-6" />
              </div>
              <Skeleton className="w-full h-6" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default loading;
