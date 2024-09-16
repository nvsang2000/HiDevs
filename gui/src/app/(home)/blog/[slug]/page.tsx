import { Markdown } from "@/components";
import { getPostSlugApi } from "@/services/apis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  FaBookmark,
  FaEnvelope,
  FaFacebook,
  FaFlag,
  FaLink,
  FaTwitter,
} from "react-icons/fa6";
import TableOfContents from "./Menu";

export default async function Page({ params }: { params: { slug: string } }) {
  const { data } = await getPostSlugApi(params.slug);
  const blog: any = data?.data;

  return (
    <div className="container mx-auto">
      <div className="hidden md:flex">
        <div className="w-[80%] p-4">
          <div className="text-[28px] font-bold mb-[20px]">{blog?.title}</div>
          <div className="flex items-start space-x-4 mb-[40px]">
            <div className="flex-shrink-0">
              <Image
                src={"/image/avatar.png"}
                alt={"icon-avatar"}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Nguyễn Sang</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaBookmark />
                  </button>
                  <div className="relative group">
                    <button className="text-gray-500 hover:text-gray-700">
                      <FaEllipsisH />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaFacebook className="mr-2" /> Chia sẻ lên Facebook
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaTwitter className="mr-2" /> Chia sẻ lên Twitter
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaEnvelope className="mr-2" /> Chia sẻ tới Email
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaLink className="mr-2" /> Sao chép liên kết
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaFlag className="mr-2" /> Báo cáo bài viết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Markdown content={blog?.content} />
        </div>
        <div className="w-[20%] p-4">
          <TableOfContents content={blog?.content} />
        </div>
      </div>
      <div className="block md:hidden">
        <div className="w-full p-4">
          <h1>{blog?.title}</h1>
          <Markdown content={blog?.content} />
        </div>
      </div>
    </div>
  );
}
