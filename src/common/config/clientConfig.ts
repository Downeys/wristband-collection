import dotenv from 'dotenv';
import { DEFAULT_MAX_FILES_ACCEPTED } from '../constants/configConstants';

dotenv.config();

interface RawEnvVars {
    acceptedImageFiles: string | undefined;
    acceptedAudioFiles: string | undefined;
    maxAcceptedFiles: string | undefined;
}

interface MusicSubmissionProps {
    acceptedImageFiles: string[];
    acceptedAudioFiles: string[];
    maxAcceptedFiles: number;
}

interface Config {
    musicSubmission: MusicSubmissionProps;
}

const envVars: RawEnvVars = {
    acceptedImageFiles: process.env.NEXT_PUBLIC_ACCEPTED_IMAGE_FILES,
    acceptedAudioFiles: process.env.NEXT_PUBLIC_ACCEPTED_AUDIO_FILES,
    maxAcceptedFiles: process.env.NEXT_PUBLIC_MAX_ACCEPTED_FILES
}

const getSanatizedConfig = (c: RawEnvVars): Config => {
    for (const [key, value] of Object.entries(c)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }

    const acceptedImageFiles = c.acceptedImageFiles
        ? c.acceptedImageFiles.split(',')
        : [];
    
    const acceptedAudioFiles = c.acceptedAudioFiles
        ? c.acceptedAudioFiles.split(',')
        : [];

    const MUSIC_SUBMISSION: MusicSubmissionProps = {
        acceptedImageFiles,
        acceptedAudioFiles,
        maxAcceptedFiles: c.maxAcceptedFiles ? parseInt(c.maxAcceptedFiles) : DEFAULT_MAX_FILES_ACCEPTED
    }

    return {
        musicSubmission: MUSIC_SUBMISSION
    }
}

export default getSanatizedConfig(envVars);
