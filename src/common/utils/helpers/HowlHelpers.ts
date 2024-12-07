import config from "@/common/config/clientConfig"

export const getMp3StreamUrl = (fileName: string): string => `${config.audioStream.audioStreamBaseUrl}mp3/${fileName}`

export const getWebmStreamUrl = (fileName: string): string => `${config.audioStream.audioStreamBaseUrl}webm/${fileName}`

