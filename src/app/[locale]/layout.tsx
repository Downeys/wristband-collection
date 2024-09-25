import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/common/components/Header/Header";

export const metadata: Metadata = {
  title: "Wristband Collection",
  description: "A music player for underground music.",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: { locale: string }
}>) {
  const locale = params.locale;
  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        {children}
      </body>
    </html>
  );
}
