import { NextResponse } from 'next/server';

export const GET = async () => {
  const metrics = await globalThis.metrics?.registry.metrics();
  return new NextResponse(metrics, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
