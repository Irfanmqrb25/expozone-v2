import {
  MdOutlineOndemandVideo,
  MdOutlineDesignServices,
  MdOutlinePhotoCameraBack,
  MdOutlineMusicNote,
  MdElectricBolt,
} from "react-icons/md";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { CgGames } from "react-icons/cg";
import { IoShirtOutline } from "react-icons/io5";
import { IoPizzaOutline } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";

export const featuredCarouselImage = [
  {
    id: 1,
    color: "bg-[#323232] text-white",
    title: "Fashion",
    description: "Get the newest fashion trends!",
    secDescription: "More than 100+ branded stores are here.",
    src: "/assets/carousel/featured-1.jpg",
    href: "/",
  },
  {
    id: 2,
    color: "bg-[#F5C6EC]",
    title: "Gaming",
    description: "Get your best gaming gear!",
    secDescription: "Get the best offer from the shop.",
    src: "/assets/carousel/featured-2.jpg",
    href: "/",
  },
  {
    id: 3,
    color: "bg-[#006E7F] text-white",
    title: "Software",
    description: "Get the software you need!",
    secDescription: "Get development code from the expert.",
    src: "/assets/carousel/featured-3.jpg",
    href: "/",
  },
  {
    id: 4,
    color: "bg-[#AA77FF]",
    title: "Everything",
    description: "Get everything you need here!",
    secDescription: "Starting from various types of store.",
    src: "/assets/carousel/featured-4.jpg",
    href: "/",
  },
];

export const categories = [
  {
    href: "/discover/search?st=video",
    label: "Video",
    description:
      "Discover captivating movies, series, and educational content.",
    icon: MdOutlineOndemandVideo,
    color: "bg-[#FF90E8]",
  },
  {
    href: "/discover/search?st=design",
    label: "Design",
    description: "Unlock stunning design templates for your creativity.",
    icon: MdOutlineDesignServices,
    color: "bg-[#889FE0]",
  },
  {
    href: "/discover/search?st=books",
    label: "Books",
    description:
      "Immerse in a digital library with enticing cookbooks and more.",
    icon: FiBookOpen,
    color: "bg-[#98EECC]",
  },
  {
    href: "/discover/search?st=music",
    label: "Music",
    description: "Discover your favorite music from pop to rock and more.",
    icon: MdOutlineMusicNote,
    color: "bg-[#F1F333]",
  },
  {
    href: "/discover/search?st=fashion",
    label: "Fashion",
    description: "Elevate your style with trendy fashion from renowned brands.",
    icon: IoShirtOutline,
    color: "bg-[#FFB6C1]",
  },
  {
    href: "/discover/search?st=foods",
    label: "Foods",
    description: "Indulge in delectable dishes and culinary delights.",
    icon: IoPizzaOutline,
    color: "bg-[#FF6347]",
  },
  {
    href: "/discover/search?st=gaming",
    label: "Gaming",
    description: "Embark on thrilling gaming adventures and more.",
    icon: CgGames,
    color: "bg-[#FF9900]",
  },
  {
    href: "/discover/search?st=software",
    label: "Software",
    description: "Enhance your digital experience with cutting-edge software.",
    icon: HiOutlineCodeBracket,
    color: "bg-[#F5EFE7]",
  },
  {
    href: "/discover/search?st=photography",
    label: "Photography",
    description: "Immerse in unique photos of breathtaking natural scenery.",
    icon: MdOutlinePhotoCameraBack,
    color: "bg-[#79E0EE]",
  },
  {
    href: "/discover/search?st=electronic",
    label: "Electronic",
    description: "Explore electrifying videos, movies, series, and lessons.",
    icon: MdElectricBolt,
    color: "bg-[#23A094]",
  },
];

export const productCategories = [
  "Website and Aplication Templates",
  "Courses and Tutorials",
  "Fonts and Typography",
  "Video and Animation",
  "Music and Audio",
  "Model And Image Assets",
  "E-Book and Writing",
];
