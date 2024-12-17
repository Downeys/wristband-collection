import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/common/components/Header/Header";
import i18nConfig from "../../../i18nConfig";
import TranslationsProvider from "@/common/context/i18n/TranslationsProvider";
import initTranslations from "@/common/utils/i18n/i18n";
import { Namespaces } from "@/common/constants/i18nConstants";
import { APP_TITLE, APP_DESCRIPTION } from "@/common/constants/metadataConstants";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
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
  const { resources } = await initTranslations(locale, Object.values(Namespaces));
  return (
    <html lang={locale}>
      <body>
        <TranslationsProvider
          namespaces={Object.values(Namespaces)}
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
