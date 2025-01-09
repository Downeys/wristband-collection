'use client'

import { SearchParams } from "@/Home/constants/playerContextConstants";
import { useSearchParams } from "next/navigation";
import { useMemo, useCallback, useState } from "react";
import LoopIcon from "../icons/LoopIcon";

interface LoopButtonProps {
    onClick: (selected: boolean) => void
}

export const LoopButton: React.FC<LoopButtonProps> = ({ onClick }) => {
    const searchParams = useSearchParams();
    const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;
    const [selected, setSelected] = useState(false);
    const [statusParam, inFocusParam, orderParam] = useMemo(() => [searchParams.get(PLAYER_STATUS), searchParams.get(IN_FOCUS), searchParams.get(ORDER)], [searchParams]);
    const handleClick = useCallback(() => {
        const newSelectedState = !selected;
        setSelected(newSelectedState)
        onClick(newSelectedState);
    }, [statusParam, inFocusParam, orderParam, selected]);
    const shadowStyle = useMemo(() => selected ? 'shadow-green' : 'shadow-pink', [selected]);
    return (
        <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full ${shadowStyle}`} onClick={handleClick}>
            <LoopIcon />
        </button>
    )
}

export default LoopButton;