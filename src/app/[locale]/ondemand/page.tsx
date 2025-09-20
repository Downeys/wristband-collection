import OnDemandPage from '@/OnDemand/OnDemandPage';

export default async function OnDemand({ searchParams }: Readonly<{ searchParams: { [key: string]: string | string[] | undefined } }>) {
  const { inFocus, playerStatus, order } = await searchParams;
  const inFocusParam = `${inFocus}`;
  const playerStatusParam = `${playerStatus}`;
  const orderParam = order ? `${order}` : '';
  return <OnDemandPage inFocusParam={inFocusParam} playerStatusParam={playerStatusParam} orderParam={orderParam} />;
}
