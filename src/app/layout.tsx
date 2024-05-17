import type { Metadata } from "next";
import { RocknRoll_One } from "next/font/google";
import "./globals.css";

const rocknRollOne = RocknRoll_One({ subsets: ["latin"], weight: "400" });

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
      <body className={rocknRollOne.className}>{children}</body>
    </html>
  );
}
