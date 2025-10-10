import { Label } from '@/common/components/text/Label';
import { formatTime } from '../../utils/helpers/playlistHelpers';
import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

interface TrackBarProps {
  duration: number;
  currentTime: number;
  progress: number;
  onSeek: (time: number) => void;
}

export const TrackBar: React.FC<TrackBarProps> = ({ duration, currentTime, progress, onSeek }) => {
  const [value, setValue] = useState(0);
  const trackPosition = useMemo(() => {
    const current = formatTime(value);
    const total = formatTime(duration);
    return `${current}/${total}`;
  }, [value, duration]);
  const showTrackPosition = useMemo(() => duration > 0, [duration]);
  const handleSeek: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const time = +e.target.value;
      setValue(time);
      onSeek(time);
    },
    [onSeek]
  );
  useEffect(() => {
    setValue(currentTime);
  }, [currentTime]);
  return (
    <div className="flex flex-col">
      <input
        className="w-full accent-wbBlue"
        type="range"
        min={0}
        max={duration ?? 100}
        step="0.01"
        value={value}
        aria-valuemin={0}
        aria-valuemax={duration ?? 100}
        aria-valuenow={value}
        aria-label="volume"
        aria-valuetext={`${progress}%`}
        onChange={handleSeek}
      />
      <div className="flex flex-row justify-end h-5">
        <Label text={showTrackPosition ? trackPosition : ''} />
      </div>
    </div>
  );
};

export default TrackBar;
