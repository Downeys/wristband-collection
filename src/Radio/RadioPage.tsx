'use client'

import Image from 'next/image';
import { SmallPlayer } from '@/common/components/SmallPlayer/SmallPlayer';
import { PlayListContext } from '@/common/context/player/PlayerContextProvider';
import React, { useContext, useMemo } from 'react'

export const RadioPage: React.FC = () => {
    const { trackInPlayer } = useContext(PlayListContext);
    const picSrc = useMemo(() => trackInPlayer?.picSrc ?? '', [trackInPlayer])
    return (
        <>
            <div className='flex flex-row justify-center items-center w-full h-screen pb-60'>
                {picSrc && <div className='w-80 h-80'>
                    <Image src={picSrc} alt="Album Art" height={320} width={320}/>
                </div>}
            </div>
            <div className="fixed bottom-0 left-0">
                <SmallPlayer play next/>
            </div>
        </>
    )
}

export default RadioPage;
