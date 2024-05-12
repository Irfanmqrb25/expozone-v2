import { ExtendedSession } from "@/next-auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

interface IUseFavorite {
  productId: string;
  session?: ExtendedSession;
}

const useFavorite = ({ productId, session }: IUseFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = session?.favoriteIds || [];

    return list.includes(productId);
  }, [session, productId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!session) {
        return router.push("/auth/sign-in");
      }

      let request;
      let toastMessage;

      try {
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${productId}`);
          toastMessage = "Produk di hapus dari favorit";
        } else {
          request = () => axios.post(`/api/favorites/${productId}`);
          toastMessage = "Product ditambahkan ke favorit";
        }

        await request();
        router.refresh();
        toast.success(toastMessage);
      } catch (error) {
        toast.error(toastMessage);
      }
    },
    [session, hasFavorited, productId, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
