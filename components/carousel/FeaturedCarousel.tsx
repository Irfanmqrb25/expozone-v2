"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { featuredCarouselImage } from "@/lib/data";
import clsx from "clsx";

const FeaturedCarousel = () => {
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
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        className="mySwiper h-[340px] md:h-[440px]"
      >
        {featuredCarouselImage.map((item) => (
          <SwiperSlide
            key={item.id}
            className="relative border-2 border-black rounded-sm h-[300px] md:h-[400px]"
          >
            <div className="relative h-full overflow-hidden cursor-pointer">
              <Image
                alt={item.title}
                src={item.src}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-white/20">
              <div className="absolute top-6 -bottom-11 right-1 left-1 md:bottom-0 md:left-0 md:right-0 w-[70%] h-[70%] m-auto text-center md:top-0 md:w-fit md:h-fit">
                <div
                  className={clsx(
                    "flex flex-col gap-3 px-5 py-5 md:px-16 md:py-8 rounded-sm border-2 border-black md:rounded-md",
                    item.color
                  )}
                >
                  <h1 className="text-sm font-medium underline uppercase md:text-lg">
                    {item.title}
                  </h1>
                  <div className="flex flex-col gap-2 mb-2">
                    <p className="hidden text-lg font-medium md:text-2xl md:block">
                      {item.description}
                    </p>
                    <p className="text-sm md:text-base">
                      {item.secDescription}
                    </p>
                  </div>
                  <p></p>
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
