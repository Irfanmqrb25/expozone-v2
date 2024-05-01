import getStore from "@/actions/getStore";
import UpdateStoreForm from "./UpdateStoreForm";
import { Store } from "lucide-react";
import Image from "next/image";
import CreateStoreButton from "@/components/CreateStoreButton";

const StorePage = async () => {
  const store = await getStore();

  if (!store)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center gap-2">
          <Store />
          <h1 className="text-2xl font-semibold lg:text-3xl">
            Create Your Store
          </h1>
        </div>
        <div className="relative w-full h-[350px] overflow-hidden rounded-md md:h-[400px] md:w-[400px] lg:w-[450px] lg:h-[450px]">
          <Image
            fill
            src="/create-store.avif"
            alt="Create Store Image"
            className="object-cover object-center"
          />
        </div>
        <CreateStoreButton />
      </div>
    );

  return (
    <div className="h-full">
      <UpdateStoreForm store={store} />
    </div>
  );
};

export default StorePage;
