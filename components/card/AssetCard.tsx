"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formattedFileSize } from "@/lib/utils";
import { ProductAsset } from "@prisma/client";
import { Lock } from "lucide-react";
import { Download, FolderIcon, FolderLock, Trash } from "lucide-react";
import { toast } from "sonner";

interface AssetCardProps {
  assetData: ProductAsset;
  type: "form" | "publish";
  isOwnProduct?: boolean;
  onRemove?: (value: string) => void;
}

const AssetCard = ({
  assetData,
  type,
  isOwnProduct,
  onRemove,
}: AssetCardProps) => {
  const handleDownloadAsset = () => {
    if (!isOwnProduct) {
      return toast.error("Beli produk untuk mendapatkan aset!");
    }
    window.open(assetData.url, "_blank");
  };

  return (
    <Card className="relative w-full md:w-[200px]">
      <div className="absolute flex items-center gap-2 top-1 right-1">
        <div
          className="p-1 border rounded-md cursor-pointer hover:bg-gray-100"
          onClick={handleDownloadAsset}
        >
          {isOwnProduct ? <Download size={16} /> : <Lock size={16} />}
        </div>
        {type === "form" && (
          <div
            className="p-1 bg-red-500 border rounded-md cursor-pointer hover:bg-red-400"
            onClick={() => onRemove?.(assetData.url)}
          >
            <Trash size={16} color="white" />
          </div>
        )}
      </div>
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-100 rounded-full">
          {isOwnProduct ? <FolderIcon size={28} /> : <FolderLock size={28} />}
        </div>
        <CardTitle className="text-base font-medium text-center line-clamp-1">
          {assetData.name}
        </CardTitle>
        {assetData.name !== "External URL" && (
          <CardDescription className="text-center">
            {formattedFileSize(assetData?.size!)}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
};

export default AssetCard;
