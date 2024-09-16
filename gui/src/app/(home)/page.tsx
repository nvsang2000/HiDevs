import { BannerCarousel, BlogCarousel, TutorialCarousel } from "@/components";

export default function HomePage() {
  return (
    <div>
      <BannerCarousel />

      <div className="flex justify-between mt-[40px]">
        <div className="text-[24px] font-bold">New post</div>
        <div className="cursor-pointer">View all</div>
      </div>
      <BlogCarousel />
      <div className="mb-[60px]"></div>

      <div className="flex justify-between mt-[40px]">
        <div className="text-[24px] font-bold">Learn with Tutorials</div>
        <div className="cursor-pointer">View all</div>
      </div>
      <TutorialCarousel />

    </div>
  );
}