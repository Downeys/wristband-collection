import HomePage from "@/Home/HomePage";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const inFocusParam = `${searchParams.inFocus}`;
  const playerStatusParam = `${searchParams.playerStatus}`;
  const orderParam = searchParams.order ? `${searchParams.order}` : '';
  return (
    <HomePage inFocusParam={inFocusParam} playerStatusParam={playerStatusParam} orderParam={orderParam} />
  );
}