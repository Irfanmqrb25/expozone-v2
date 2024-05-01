import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface MenuItemProps {
  onClick?: () => void;
  icon: IconType;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, icon: Icon, label }) => {
  const router = useRouter();
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center gap-4 hover:text-[#006E7F]"
    >
      <Icon className="text-xl" />
      <span className="font-light">{label}</span>
    </button>
  );
};

export default MenuItem;
