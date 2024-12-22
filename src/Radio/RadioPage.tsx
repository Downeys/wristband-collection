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
            <div className='fixed top-0 left-0 flex flex-row justify-center items-center w-full h-screen pb-56 pt-20'>
                {picSrc && <div className='w-72 h-72'>
                    <Image src={picSrc} alt="Album Art" height={288} width={288}/>
                </div>}
            </div>
            <div className="fixed bottom-0 left-0">
                <SmallPlayer play next/>
            </div>
        </>
    )
}

export default RadioPage;
