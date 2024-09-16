import "@/app/globals.css";
import type { Metadata } from "next";
import { FooterSection, HeaderSection } from "@/components";
export const metadata: Metadata = {
  title: "HI DEV",
  description: "Share knowledge with the community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col h-screen">
      <HeaderSection />
      <div className="container mx-auto px-4 py-4 pt-[80px] sm:pt-[80px] md:pt-[80px] lg:pt-[80px] xl:pt-[80px]">
        {children}
      </div>
      <FooterSection />
    </div>
  );
}
