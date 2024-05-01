import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedPageLoading = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative border-2 border-black rounded-sm h-[300px] md:h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mt-5">
        <Skeleton className="w-[200px] md:w-[300px] h-10" />
        <Skeleton className="w-full lg:w-[600px] h-40 md:h-16" />
      </div>
      <Card className="flex flex-col items-center justify-center px-3 py-16 border-2 border-black my-14 gap-7">
        <Skeleton className="w-full h-10" />
        <div className="flex items-center justify-center w-full gap-2">
          <Skeleton className="w-full h-9" />
          <Skeleton className="w-full h-9" />
        </div>
      </Card>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <Skeleton className="w-[150px] h-8" />
            <Skeleton className="w-[100px] h-6" />
          </div>
          <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card
                key={i}
                className="h-full overflow-hidden border-2 border-black rounded-sm shadow-card"
              >
                <CardHeader className="p-0 border-b-2 border-black">
                  <AspectRatio
                    ratio={4 / 3}
                    className="relative overflow-hidden"
                  >
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
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <Skeleton className="w-[150px] h-8" />
            <Skeleton className="w-[100px] h-6" />
          </div>
          <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card
                key={i}
                className="h-full overflow-hidden border-2 border-black rounded-sm shadow-card"
              >
                <CardHeader className="p-0 border-b-2 border-black">
                  <AspectRatio
                    ratio={4 / 3}
                    className="relative overflow-hidden"
                  >
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
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <Skeleton className="w-[150px] h-8" />
            <Skeleton className="w-[100px] h-6" />
          </div>
          <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card
                key={i}
                className="h-full overflow-hidden border-2 border-black rounded-sm shadow-card"
              >
                <CardHeader className="p-0 border-b-2 border-black">
                  <AspectRatio
                    ratio={4 / 3}
                    className="relative overflow-hidden"
                  >
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
      </div>
    </div>
  );
};

export default FeaturedPageLoading;
