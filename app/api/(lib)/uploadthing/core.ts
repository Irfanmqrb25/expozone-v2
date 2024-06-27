import { getCurrentUser } from "@/data/get-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");
  return { userId: user.id };
};

export const ourFileRouter = {
  avatarUpload: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  productImageUpload: f({ image: { maxFileSize: "4MB", maxFileCount: 3 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  productAssetUpload: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
    blob: { maxFileSize: "8MB", maxFileCount: 2 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
