"use client";
import { UserForm } from "@/components";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
export default function UserDetailPage({ params }: { params: { id: string } }) {
  const { back } = useRouter()
  const id = params?.id;

  return (
    <div>
      <div className="flex items-center cursor-pointer mb-[10px]" onClick={back}>
        <FaAngleLeft className="w-[20px] h-[20px]"  />
        <div className="text-[18px] font-medium">Go back</div>
      </div>
      <div className="bg-white p-[20px] rounded-[6px]">
        <UserForm id={id !== "create" ? id : undefined} />
      </div>
    </div>
  );
}
