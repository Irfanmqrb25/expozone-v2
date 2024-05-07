"use client";

import Image from "next/image";

import AssetCard from "./card/AssetCard";
import { Button, buttonVariants } from "./ui/button";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import deleteFiles from "@/actions/deleteFile";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  endpoint: "productImageUpload" | "productAssetUpload";
  value: any[];
  onChange: (value?: any) => void;
  onRemove?: (url: string) => void;
}

const FileUpload = ({
  onChange,
  value,
  endpoint,
  onRemove,
}: FileUploadProps) => {
  return (
    <div>
      {/* for upload result */}
      {endpoint === "productImageUpload" &&
        (value.length > 0 ? (
          <div className="flex flex-col items-center gap-4 mb-4 lg:flex-row">
            {value.map((url) => (
              <div
                key={url}
                className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
              >
                <div className="absolute z-10 top-2 right-2">
                  <Button
                    type="button"
                    onClick={async () => {
                      onRemove?.(url);
                      await deleteFiles(url);
                    }}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
                <Image
                  fill
                  className="object-cover"
                  alt="Product image"
                  src={url}
                />
              </div>
            ))}
          </div>
        ) : (
          <Image
            src={"/blank-image.jpg"}
            className="object-cover mb-2 rounded-md"
            width={200}
            height={200}
            alt="Placeholder"
          />
        ))}

      {/* for upload file */}
      {endpoint === "productImageUpload" && (
        <UploadButton
          endpoint={endpoint}
          appearance={{
            button: cn(
              buttonVariants({ variant: "outline" }),
              "text-black dark:text-white w-[200px]"
            ),
            container: "w-max flex-col rounded-md border-cyan-300",
            allowedContent: "bg-background",
          }}
          content={{
            button({ ready }) {
              if (ready) return "Pilih Gambar";
              return "Bersiap-siap...";
            },
            allowedContent({ uploadProgress, isUploading }) {
              if (isUploading) return `Mengunggah ${uploadProgress}%`;
              return "";
            },
          }}
          onClientUploadComplete={(res) => {
            const urls = res.map((file) => file.url);
            onChange(urls);
          }}
          onUploadError={(error) => {
            toast.error("Gagal mengunggah");
          }}
        />
      )}

      {value.length > 0 &&
      typeof value !== "string" &&
      endpoint !== "productImageUpload" ? (
        <div className="flex items-center gap-4">
          {value.map((item) => (
            <AssetCard
              key={item.id}
              assetData={item}
              type="form"
              isOwnProduct={true}
              onRemove={async () => {
                onRemove?.(item.url);
                await deleteFiles(item.url);
              }}
            />
          ))}
        </div>
      ) : (
        endpoint === "productAssetUpload" && (
          <UploadDropzone
            endpoint={endpoint}
            className="border-dashed hover:cursor-pointer"
            appearance={{
              button: "text-white w-[200px] bg-muted-foreground",
              allowedContent: "text-muted-foreground",
            }}
            onClientUploadComplete={(res) => {
              onChange(res);
              console.log(res);
            }}
            onUploadError={(error) => {
              toast.error("Gagal mengunggah");
            }}
          />
        )
      )}
    </div>
  );
};

export default FileUpload;
