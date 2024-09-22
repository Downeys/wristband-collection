import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/common/components/Header/Header";

export const metadata: Metadata = {
  title: "Wristband Collection",
  description: "A music player for underground music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
