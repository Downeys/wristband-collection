import OnDemandPage from '@/OnDemand/OnDemandPage';

export default function OnDemand({ searchParams }: Readonly<{ searchParams: { [key: string]: string | string[] | undefined } }>) {
  const inFocusParam = `${searchParams.inFocus}`;
  const playerStatusParam = `${searchParams.playerStatus}`;
  const orderParam = searchParams.order ? `${searchParams.order}` : '';
  return <OnDemandPage inFocusParam={inFocusParam} playerStatusParam={playerStatusParam} orderParam={orderParam} />;
}
