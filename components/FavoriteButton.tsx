import useFavorite from "@/hooks/useFavorites";
import { ExtendedSession } from "@/next-auth";
import { FaHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  productId: string;
  session?: ExtendedSession;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  session,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    productId,
    session,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <FaHeart
        size={18}
        className={hasFavorited ? "fill-red-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default FavoriteButton;
