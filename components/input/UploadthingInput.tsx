"use client";

import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";
import deleteFiles from "@/actions/deleteFile";

interface UploadthingInputProps {
  onChange: (url?: string) => void;
  value: string;
}

const UploadthingInput: React.FC<UploadthingInputProps> = ({
  onChange,
  value,
}) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center justify-center gap-3 mx-auto overflow-hidden lg:mx-0">
        {value ? (
          <div className="relative w-24 h-24 border border-dashed rounded-full">
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-0 right-0 z-10 w-6 h-6 rounded-full"
              onClick={async () => {
                onChange("");
                await deleteFiles(value);
              }}
            >
              <X size={16} color="white" />
            </Button>
            <Image
              fill
              src={value}
              alt="store image"
              className="object-cover rounded-full"
            />
          </div>
        ) : (
          <div className="relative w-24 h-24 overflow-hidden border border-dashed rounded-full">
            <Image
              fill
              src="/blank-store.png"
              alt="store image placeholder"
              className="object-cover"
            />
          </div>
        )}
        <UploadButton
          appearance={{
            button: cn(
              buttonVariants({ variant: "outline" }),
              "text-black dark:text-white"
            ),
            container: "w-max flex-col rounded-md border-cyan-300",
            allowedContent: "bg-background",
          }}
          content={{
            button({ ready }) {
              if (ready) return "Change Avatar";

              return "Getting ready...";
            },
            allowedContent({ uploadProgress, isUploading }) {
              if (isUploading) return `Uploading ${uploadProgress}%`;
              return "";
            },
          }}
          endpoint="avatarUpload"
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      </div>
    </div>
  );
};

export default UploadthingInput;
