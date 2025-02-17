import { Schema, model, models } from 'mongoose';
import { MusicSubmissionSchema } from '@/models/types';

const musicSubmissionSchema = new Schema<MusicSubmissionSchema>(
  {
    band: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    attestation: {
      type: Boolean,
      required: true,
    },
    imageLinks: {
      type: [String],
      required: true,
    },
    audioLinks: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MusicSubmission = models.MusicSubmission || model<MusicSubmissionSchema>('MusicSubmission', musicSubmissionSchema);
