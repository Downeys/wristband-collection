import AboutPage from '@/About/AboutPage';

export default async function About({ params }: Readonly<{ params: { locale: string } }>) {
  const locale = `${params.locale}`;
  return <AboutPage locale={locale} />;
}
