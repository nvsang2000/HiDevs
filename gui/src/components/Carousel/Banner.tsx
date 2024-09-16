import { Image } from "@nextui-org/image";
import { Carousel } from ".";
import { SwiperSlide } from "swiper/react";

export default function BannerCarousel() {
  const item = [
    { src: "/image/banner-slide-2.jpg", alt: "logo 2" },
    { src: "/image/banner-slide-1.png", alt: "logo 1" },
    { src: "/image/banner-slide-3.jpg", alt: "logo 3" },
  ];
  const renderItem = () => {
    return item?.map((item, index) => {
      return (
        <SwiperSlide key={index}>
          <div className="relative">
            <div>
              <Image
                className="w-full h-auto object-cover"
                src={item.src}
                alt={item.alt}
                width="100%"
              />
            </div>
            <div className="absolute bottom-[50%] left-[10%] z-10 p-[20px] tex-black bg-white shadow-md">
              <div className="text-[24px] font-medium">
                Explore your curiosity
              </div>
              <div>Find what’s next and accelerate your career.</div>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };
  return (
    <Carousel
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {renderItem()}
    </Carousel>
  );
}
