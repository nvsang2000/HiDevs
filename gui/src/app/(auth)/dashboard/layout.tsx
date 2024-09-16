import "@/app/globals.css";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { DashboardLayout } from "@/components";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Share knowledge with the community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  if(currentUser && currentUser?.role !== "ADMIN") return redirect('/')
  return (
    <AntdRegistry>
      <DashboardLayout>{children}</DashboardLayout>
    </AntdRegistry>
  );
}
