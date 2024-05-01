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
        return router.push("/login");
      }

      let request;
      let toastMessage;

      try {
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${productId}`);
          toastMessage = "Product has been removed from favorites";
        } else {
          request = () => axios.post(`/api/favorites/${productId}`);
          toastMessage = "Product added to favorites";
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
