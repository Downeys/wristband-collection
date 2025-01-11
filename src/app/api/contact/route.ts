import { insertUserFeedback } from '@/server/actions/userFeedback';
import { NextResponse } from 'next/server';
import { SUCCESS_MESSAGE, CONTACT_FAILURE } from '@/common/constants/backend/responseMessages';

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    await insertUserFeedback(data);

    return NextResponse.json({
      message: SUCCESS_MESSAGE,
    });
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({
      message: CONTACT_FAILURE,
      status: 500,
    });
  }
};
