import HomePage, { preloadTracks } from "@/components/home/HomePage";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const inFocusParam = `${searchParams.inFocus}`;
  const playerStatusParam = `${searchParams.playerStatus}`;
  preloadTracks()
  return (
    <HomePage inFocusParam={inFocusParam} playerStatusParam={playerStatusParam} />
  );
}