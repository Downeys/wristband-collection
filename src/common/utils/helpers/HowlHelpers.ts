import { Howl } from 'howler';
import config from "@/common/config/clientConfig"

const getMp3StreamUrl = (fileName: string): string => `${config.audioStream.audioStreamBaseUrl}mp3/${fileName}`

const getWebmStreamUrl = (fileName: string): string => `${config.audioStream.audioStreamBaseUrl}webm/${fileName}`

export const createHowl = (fileName: string, onEnd: () => void) => {
    return new Howl({
        src: [getWebmStreamUrl(fileName), getMp3StreamUrl(fileName)],
        format: ['webm','mp3'],
        html5: true,
        preload: true,
        onend: onEnd
    })
};
