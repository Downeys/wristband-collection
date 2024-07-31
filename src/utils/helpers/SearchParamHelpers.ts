import { PlayerStatus } from '@/types/PlayerStatusEnum';

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

export const decodePlayerStatusParam = (playerStatusParam: string) : [PlayerStatus, string] => {
    const status = getPlayerStatus(playerStatusParam.slice(0,1))
    const trackId = playerStatusParam.slice(1);
    return [status, trackId];
}

export const constructPlayerStatusAction = (action: PlayerStatus | null, trackId: string) => {
    var actionCode;
    if (action === PlayerStatus.playing) actionCode = "P";
    else if (action === PlayerStatus.paused) actionCode = "S";
    else actionCode = "S";
    return actionCode + trackId;
}

