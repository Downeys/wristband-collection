import { UserFeedback } from '@/models/userFeedback';
import { connectToDb } from '@/server/config/mongoRepo';
import { ContactForm } from '@/Contact/types/contactFormTypes';

export const insertUserFeedback = async (form: ContactForm): Promise<number> => {
  try {
    await connectToDb();
    await UserFeedback.create(form);
    return 1;
  } catch (e: any) {
    globalThis.logger?.error({
      err: e,
      message: 'Failed to insert user feedback in db',
    });
    return 0;
  }
};
