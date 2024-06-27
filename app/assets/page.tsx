import AssetCard from "@/components/card/AssetCard";
import EmptyMessage from "@/components/EmptyMessage";

import { FolderArchive } from "lucide-react";
import { getUserAssets } from "@/data/get-asset";
import { MdOutlineFolderOff } from "react-icons/md";

const AssetsPage = async () => {
  const assets = await getUserAssets();

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2">
          <FolderArchive size={26} />
          <h1 className="text-xl font-bold tracking-tight text-transparent md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text">
            Asset Saya
          </h1>
        </div>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          Lihat semua asset dari produk yang kamu beli
        </p>
      </div>
      {assets.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:gap-3 2xl:gap-x-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8">
          {assets.map((item) => (
            <AssetCard
              key={item?.id}
              assetData={item!}
              type="publish"
              isOwnProduct
            />
          ))}
        </div>
      ) : (
        <EmptyMessage
          icon={MdOutlineFolderOff}
          title="Tidak ada asset"
          description="Kamu belum membeli produk apapun"
        />
      )}
    </div>
  );
};

export default AssetsPage;
