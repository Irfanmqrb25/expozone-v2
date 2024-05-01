import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const FavoritesPageLoading = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="w-[200px] h-8" />
      <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card
            key={i}
            className="h-full overflow-hidden border-2 border-black rounded-sm shadow-card"
          >
            <CardHeader className="p-0 border-b-2 border-black">
              <AspectRatio ratio={4 / 3} className="relative overflow-hidden">
                <Skeleton className="w-full h-full" />
              </AspectRatio>
            </CardHeader>
            <CardContent className="grid gap-2.5 p-4 border-b-2 border-black">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-20 h-6" />
              <div className="flex items-center gap-1">
                <Avatar className="border-2 border-black w-7 h-7">
                  <Skeleton className="w-full h-full rounded-full" />
                </Avatar>
                <Skeleton className="w-full h-5" />
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <div className="flex flex-row items-center w-full gap-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPageLoading;
