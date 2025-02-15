import { insertUserFeedback } from '@/server/actions/userFeedback';
import { NextResponse } from 'next/server';
import { SUCCESS_MESSAGE, CONTACT_FAILURE } from '@/common/constants/backend/responseMessages';

const NAMESPACE = 'api-contact-route';

export const POST = async (request: Request) => {
  try {
    globalThis.logger?.info({
      meta: {
        namespace: NAMESPACE,
      },
      message: 'Submitting user feedback',
    });
    const data = await request.json();

    await insertUserFeedback(data);

    return NextResponse.json({
      message: SUCCESS_MESSAGE,
    });
  } catch (e: any) {
    globalThis.logger?.error({
      err: e,
      message: 'Failed to upload user feedback.',
    });
    return NextResponse.json({
      message: CONTACT_FAILURE,
      status: 500,
    });
  }
};
