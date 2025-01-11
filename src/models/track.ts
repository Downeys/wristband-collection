import { Schema, model, models } from 'mongoose';
import { TrackSchema } from '@/models/types';

const trackSchema = new Schema<TrackSchema>({
  trackName: {
    type: String,
    required: true,
  },
  bandName: {
    type: String,
    required: true,
  },
  audioSrc: {
    type: String,
    required: true,
  },
  picSrc: {
    type: String,
    required: true,
  },
  buyLink: {
    type: String,
    requried: true,
  },
  position: {
    type: Number,
    required: true,
  },
});

export const Track = models.Track || model<TrackSchema>('Track', trackSchema);
