import HomePage from "@/components/home/HomePage";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const inFocusParam = `${searchParams.inFocus}`;
  const playerStatusParam = `${searchParams.playerStatus}`;
  return (
    <HomePage inFocusParam={inFocusParam} playerStatusParam={playerStatusParam} />
  );
}