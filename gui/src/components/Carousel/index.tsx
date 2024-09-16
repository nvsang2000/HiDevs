"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper } from "swiper/react";
import { Autoplay, Pagination, Navigation, Scrollbar } from "swiper/modules";
import BannerCarousel from "./Banner";
import TutorialCarousel from "./Tutorial";
import BlogCarousel from "./Blog";
interface PropsCarousel {
  children: any;
  spaceBetween?: number;
  slidesPerView?: number;
  isBreakpoint?: boolean;
  navigation?: boolean | any;
  autoplay?: {
    delay: number;
    disableOnInteraction: boolean;
  };
}

function Carousel({
  children,
  spaceBetween = 20,
  isBreakpoint = false,
  navigation = true,
  autoplay,
}: PropsCarousel) {
  return (
    <div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer"></div>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={"auto"}
        autoplay={autoplay}
        scrollbar={true}
        modules={[Autoplay, Pagination, Navigation, Scrollbar]}
        navigation={navigation}
        {...(isBreakpoint && {
          breakpoints: {
            320: { slidesPerView: 1 },
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4 },
          },
        })}
      >
        {children}
      </Swiper>
    </div>
  );
}

export { Carousel, BannerCarousel, TutorialCarousel, BlogCarousel };
