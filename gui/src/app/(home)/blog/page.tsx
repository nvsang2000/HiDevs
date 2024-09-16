"use client";
import { FakeDataPost } from "@/constants";
import Image from "next/image";

export default function PostsSection() {
  const CourseCard = ({ title, thumbnail, hoverText }: any) => {
    return (
      <div>
        <div className="relative group">
          <div className="!w-[250] !h-[200px]">
            <Image
              layout="fill"
              objectFit="cover"
              src={"/image/logo1.jpeg"}
              alt={title}
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white text-black py-2 px-4 rounded-lg transform translate-y-8 group-hover:translate-y-0 transition duration-300">
              {hoverText}
            </button>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-lg font-semibold">{title}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-[80px]">
      <div className="flex justify-between mb-[10px]">
        <div className="text-[20px] text-black font-medium">Tutorials</div>
        <div className="text-[var(--dark-blue)]">
          See more<span>{">"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {FakeDataPost.map((item) => {
          return (
            <div key={item.id}>
              <CourseCard
                title={item.title}
                thumbnail={item.thumbnail}
                hoverText="Xem khóa học"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
