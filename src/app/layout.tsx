import React from 'react';
import { DEFAULT_LOCALE } from '@/common/constants/i18nConstants';
import { APP_DESCRIPTION, APP_TITLE } from '@/common/constants/metadataConstants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = params.locale ?? DEFAULT_LOCALE;
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
