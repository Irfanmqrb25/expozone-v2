"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import clsx from "clsx";
import { Libre_Baskerville } from "next/font/google";

const font = Libre_Baskerville({
  weight: ["700"],
  subsets: ["latin"],
});

const FeaturedCarousel = () => {
  const featuredCarouselImage = [
    {
      id: 4,
      color: "bg-[#AA77FF]",
      title: "Model dan Aset Gambar",
      src: "/assets/carousel/featured-4.webp",
    },
    {
      id: 1,
      color: "bg-[#D862BC] text-white",
      title: "Font dan Tipografi",
      src: "/assets/carousel/featured-1.jpg",
    },
    {
      id: 2,
      color: "bg-[#CDCDC8]",
      title: "E-Book dan Tulisan",
      src: "/assets/carousel/featured-2.jpg",
    },
    {
      id: 3,
      color: "bg-[#006E7F] text-white",
      title: "Website dan Aplikasi Templates",
      src: "/assets/carousel/featured-3.jpg",
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Navigation, EffectFade]}
        effect="fade"
        className="mySwiper h-[340px] md:h-[440px]"
      >
        {featuredCarouselImage.map((item) => (
          <SwiperSlide
            key={item.id}
            className="relative border-2 border-black rounded-sm h-[300px] md:h-[400px]"
          >
            <div className="h-full overflow-hidden cursor-pointer">
              <Image
                alt={item.title}
                src={item.src}
                style={{ objectFit: "cover" }}
                loading="lazy"
                fill
              />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-white/20">
              <div className="flex items-center justify-center w-full h-full px-6">
                <div
                  className={clsx(
                    "px-5 py-5 md:px-16 md:py-8 rounded-sm border-2 my-shadow border-black md:rounded-md",
                    item.color,
                    font.className
                  )}
                >
                  <h1 className="text-sm font-bold tracking-wider text-center uppercase md:text-lg lg:text-xl">
                    {item.title}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeaturedCarousel;
