import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/common/components/Header/Header";
import i18nConfig from "../../../i18nConfig";
import TranslationsProvider from "@/common/context/TranslationsProvider";
import initTranslations from "@/common/utils/i18n/i18n";

export const metadata: Metadata = {
  title: "Wristband Radio",
  description: "A music player for underground music.",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: { locale: string }
}>) {
  const locale = params.locale;
  const { resources } = await initTranslations(locale, ['common', 'home', 'contact', 'submit', 'about']);
  return (
    <html lang={locale}>
      <body>
        <TranslationsProvider
          namespaces={['contact']}
          locale={locale}
          resources={resources}
        >
          <Header locale={locale} />
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}
