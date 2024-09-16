"use client";
import { DEFAULT_AVATAR } from "@/constants";
import { useAuth } from "@/hooks";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
export default function TutorialsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { currentUser } = useAuth();
  console.log("params", currentUser);
  return (
    <div>
      <div className="mx-auto p-4">
        <Image
          className="w-full h-auto object-cover"
          src={'/image/banner-user.jpg'}
          alt={'banner-user'}
          width="100%"
        />
        <div className="flex items-center space-x-4 mt-[-20px] z-90">
          <Avatar
            src={currentUser?.profile?.avatar || DEFAULT_AVATAR}
            className="w-40 h-40 text-large"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {currentUser?.profile?.nickname}
            </h1>
            <p className="text-gray-600">
              Thành viên của F8 - Học lập trình để đi làm từ 27 phút trước
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h2 className="font-bold">Giới thiệu</h2>
            <p>Thành viên của F8 - Học lập trình để đi làm từ 27 phút trước</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="font-bold">Các khóa học đã tham gia</h2>
            <p>Chưa có khóa học nào được đăng ký</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="font-bold">Hoạt động gần đây</h2>
            <p>Chưa có hoạt động gần đây</p>
          </div>
        </div>
      </div>
    </div>
  );
}
