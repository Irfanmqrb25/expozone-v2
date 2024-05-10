import CategoryCard from "@/components/card/CategoryCard";
import SearchProduct from "@/components/input/SearchProduct";

import {
  MdOutlineOndemandVideo,
  MdOutlineDesignServices,
  MdOutlinePhotoCameraBack,
  MdOutlineMusicNote,
} from "react-icons/md";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { FiBookOpen } from "react-icons/fi";

export const DiscoverPage = () => {
  const discoverCategories = [
    {
      href: "/discover/search?st=font dan tipografi",
      label: "Font dan Tipografi",
      description:
        "Temukan berbagai macam font dan tipografi yang cocok untuk kebutuhanmu.",
      icon: MdOutlineDesignServices,
      color: "bg-[#AA77FF]",
    },
    {
      href: "/discover/search?st=e-book dan tulisan",
      label: "E-Book dan Tulisan",
      description:
        "Jelajahi dunia e-book dan tulisan yang menginspirasi dari penulis-penulis terbaik.",
      icon: FiBookOpen,
      color: "bg-[#98EECC]",
    },
    {
      href: "/discover/search?st=musik dan audio",
      label: "Musik dan Audio",
      description:
        "Dengarkan musik dan audio berkualitas tinggi untuk menemani setiap momenmu.",
      icon: MdOutlineMusicNote,
      color: "bg-[#F1F333]",
    },
    {
      href: "/discover/search?st=video dan animasi",
      label: "Video dan Animasi",
      description:
        "Jelajahi dunia kreatif video dan animasi untuk membuat konten yang menarik.",
      icon: MdOutlineOndemandVideo,
      color: "bg-[#5BBCFF]",
    },
    {
      href: "/discover/search?st=templat web dan aplikasi",
      label: "Templat Web dan Aplikasi",
      description:
        "Temukan templat web dan aplikasi yang memudahkan dalam pembuatan proyek-proyekmu.",
      icon: HiOutlineCodeBracket,
      color: "bg-[#F5EFE7]",
    },
    {
      href: "/discover/search?st=model dan aset gambar",
      label: "Model dan Aset Gambar",
      description:
        "Temukan koleksi model dan aset gambar berkualitas untuk proyek kreatifmu.",
      icon: MdOutlinePhotoCameraBack,
      color: "bg-[#FF9900] ",
    },
  ];

  return (
    <div className="w-full h-full space-y-7 lg:px-40">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-center md:text-3xl">
          Cari Produk
        </h1>
        <SearchProduct />
      </div>
      <div className="space-y-3">
        <p className="text-lg font-medium md:text-2xl">
          Produk berdasarkan kategori
        </p>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {discoverCategories.map((category) => (
            <CategoryCard
              key={category.label}
              href={category.href}
              label={category.label}
              description={category.description}
              icon={category.icon}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
