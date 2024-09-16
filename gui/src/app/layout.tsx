import "./globals.css";
import { Viewport } from "next";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { Provider } from "@/components";
import { AuthProvider } from "@/context/auth";
import { getCurrentUser } from "@/actions";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <AuthProvider initCurrentUser={currentUser}>
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
