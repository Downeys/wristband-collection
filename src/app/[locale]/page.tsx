import HomePage from "@/Home/HomePage";

export default function Home({ searchParams, params }: { searchParams: { [key: string]: string | string[] | undefined }, params: { locale: string } }) {
  const inFocusParam = `${searchParams.inFocus}`;
  const playerStatusParam = `${searchParams.playerStatus}`;
  const locale = `${params.locale}`;
  const orderParam = searchParams.order ? `${searchParams.order}` : '';
  return (
    <HomePage inFocusParam={inFocusParam} playerStatusParam={playerStatusParam} orderParam={orderParam} locale={locale} />
  );
}