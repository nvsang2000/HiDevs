import { Carousel } from ".";
import { SwiperSlide } from "swiper/react";
import { getPostsApi } from "@/services/apis";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";

export default function BlogCarousel() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    return await getPostsApi().then((res) => {
      const { data } = res || {};
      setPosts(data?.data?.docs || []);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = () => {
    return posts?.map((item: any, index) => {
      const { slug, title, thumbnail } = item;
      return (
        <SwiperSlide key={index}>
          <Card
            className="w-full max-w-sm mx-auto m-[10px]"
            shadow="sm"
            key={index}
            isPressable
            onClick={() => router.push(`/blog/${slug}`)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="sm"
                width="100%"
                alt={title}
                className="w-full object-cover h-[200px]"
                src={thumbnail || "/image/logo2.jpeg"}
                fallbackSrc={"/image/logo2.jpeg"}
              />
            </CardBody>
            <CardFooter className="text-small ">
              <div className="line-clamp-1 m-[10px] font-bold text-[16px]">
                {title}
              </div>
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
