import { Carousel } from ".";
import { SwiperSlide } from "swiper/react";
import { FakeDataPost } from "@/constants";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
export default function TutorialCarousel() {
  const renderItem = () => {
    return FakeDataPost?.map((item, index) => {
      const href = `/tutorials/${item.slug}`;
      return (
        <SwiperSlide key={index}>
          <Card
            className="w-full max-w-sm mx-auto m-[10px]"
            shadow="sm"
            key={index}
            isPressable
            onClick={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="sm"
                width="100%"
                alt={"icon"}
                className="w-full object-cover h-[200px]"
                src={"/image/logo2.jpeg"}
              />
            </CardBody>
            <CardFooter className="text-small ">
              <div className="line-clamp-1 m-[10px] font-bold text-[16px]">Bài viết số</div>
            </CardFooter>
          </Card>
        </SwiperSlide>
      );
    });
  };
  return (
    <Carousel isBreakpoint navigation={false}>
      {renderItem()}
    </Carousel>
  );
}
