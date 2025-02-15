import { GET_TRACKS_FAILURE } from '@/common/constants/backend/responseMessages';
import { getAllTracks } from '@/server/actions/tracks';
import { NextResponse } from 'next/server';

const NAMESPACE = 'api-tracks-route';

export const GET = async () => {
  try {
    globalThis.logger?.info({
      meta: {
        namespace: NAMESPACE,
      },
      message: 'Fetching track list.',
    });
    const tracks = getAllTracks();
    return NextResponse.json({ data: tracks });
  } catch (e: any) {
    globalThis.logger?.error({
      err: e,
      message: 'Failed to fetch track list',
    });
    return NextResponse.json({
      message: GET_TRACKS_FAILURE,
      status: 500,
    });
  }
};
