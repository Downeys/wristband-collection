import { MusicSubmission } from '@/models/musicSubmission';
import { SubmitFormDto } from '@/Submit/types/submitMusicFormTypes';
import { connectToDb } from '@/server/config/mongoRepo';

export const insertMusicSubmission = async (form: SubmitFormDto): Promise<number> => {
  try {
    await connectToDb();
    await MusicSubmission.create(form);
    return 1;
  } catch (e: any) {
    globalThis.logger?.error({
      err: e,
      message: 'Failed to insert music submission in db.',
    });
    return 0;
  }
};
