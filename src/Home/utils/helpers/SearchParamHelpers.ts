import { PlayerStatus } from '@/Home/types/playerStatusEnum';
import { Buffer } from 'buffer';

const encodeParam = (param: string): string => {
    return Buffer.from(param, 'utf-8').toString('base64');
}

const decodeParam = (param: string): string => {
    const decodedData = Buffer.from(param, 'base64');
    return decodedData.toString();
}

export const getPlayerStatusAction = (actionCode: string) => {
    switch (actionCode){
        case 'P':
            return 'play';
        case 'S':
            return 'pause';
        default:
            return 'pause';
    }
}

export const getPlayerStatus = (actionCode: string ='') => {
    switch (actionCode){
        case 'P':
            return PlayerStatus.playing;
        case 'S':
            return PlayerStatus.paused;
        default:
            return PlayerStatus.uninitiated;
    }
}

export const decodePlayerStatusParam = (playerStatusParam: string) : { status: PlayerStatus, index: number } => {
    const status = getPlayerStatus(playerStatusParam.slice(0,1))
    const index = Number.parseInt(playerStatusParam.slice(1));
    return { status, index };
}

export const constructPlayerStatusAction = (action: PlayerStatus | null, trackIndex: number) => {
    var actionCode;
    if (action === PlayerStatus.playing) actionCode = "P";
    else if (action === PlayerStatus.paused) actionCode = "S";
    else actionCode = "S";
    return `${actionCode}${trackIndex}`
}

export const encodeOrderParam = (orderList: number[]): string => {
    return encodeParam(JSON.stringify(orderList));
}

export const decodeOrderParam = (param: string): number[] => {
    if (!param || !param.length) return [];
    const decodedString = decodeParam(param)
    return JSON.parse(decodedString);
}