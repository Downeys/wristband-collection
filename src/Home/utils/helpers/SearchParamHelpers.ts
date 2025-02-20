import { PlayerStatus } from '@/common/types/playerStatusEnum';
import { Buffer } from 'buffer';

const encodeParam = (param: string): string => {
  return Buffer.from(param, 'utf-8').toString('base64');
};

const decodeParam = (param: string): string => {
  const decodedData = Buffer.from(param, 'base64');
  return decodedData.toString();
};

export const getPlayerStatusAction = (actionCode: string) => {
  switch (actionCode) {
    case 'P':
      return 'play';
    case 'S':
      return 'pause';
    default:
      return 'pause';
  }
};

export const getPlayerStatus = (actionCode: string = '') => {
  switch (actionCode) {
    case 'P':
      return PlayerStatus.playing;
    case 'S':
      return PlayerStatus.paused;
    default:
      return PlayerStatus.uninitiated;
  }
};

export const decodePlayerStatusParam = (playerStatusParam: string): { status: PlayerStatus; id: string } => {
  const decodedPlayerStatus = decodeParam(playerStatusParam);
  const [status, id] = decodedPlayerStatus.split('$');
  const s = getPlayerStatus(status);
  return { status: s, id };
};

export const constructPlayerStatusAction = (action: PlayerStatus | null, trackId: string) => {
  let actionCode;
  if (action === PlayerStatus.playing) actionCode = 'P';
  else if (action === PlayerStatus.paused) actionCode = 'S';
  else actionCode = 'S';
  const encodedPlayerStatus = encodeParam(`${actionCode}$${trackId}`);
  return encodedPlayerStatus;
};

export const encodeOrderParam = (orderList: number[]): string => {
  return encodeParam(JSON.stringify(orderList));
};

export const decodeOrderParam = (param: string): number[] => {
  if (!param) return [];
  if (!param.length) return [];
  const decodedString = decodeParam(param);
  return JSON.parse(decodedString);
};
