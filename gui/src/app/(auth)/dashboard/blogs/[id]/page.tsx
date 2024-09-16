"use client";
import { BlogForm } from "@/components";
import {
  createPostApi,
  daletePostApi,
  getPostIDApi,
  updatePostApi,
} from "@/services/apis";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

export default function DetailBlogPage({ params }: { params: { id: string } }) {
  const [initialValues, setInitialValues] = useState<any>({});
  const { back } = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (id && id !== "create") {
      getPostIDApi(id).then(({ data }) => {
        const post = data?.data;
        if (post) setInitialValues({ ...post });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (value: any) => {
    try {
      if (id && id !== "create") {
        const valueUpdate = { undo: initialValues, update: value };
        await updatePostApi(value.id, valueUpdate);
        message.success("Update successful!");
      } else {
        await createPostApi(value);
        message.success("Create new successful!");
      }
      back();
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const handleRemove = async () => {
    try {
      await daletePostApi(id);
      message.success("Delete successful!");
      back();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div
        className="flex items-center cursor-pointer mb-[10px]"
        onClick={back}
      >
        <FaAngleLeft className="w-[20px] h-[20px]" />
        <div className="text-[18px] font-medium">Go back</div>
      </div>
      <div className="bg-white p-[40px] rounded-[6px]">
        <BlogForm
          id={id !== "create" ? id : undefined}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
