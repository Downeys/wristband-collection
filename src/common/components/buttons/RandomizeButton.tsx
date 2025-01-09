'use client'

import { SearchParams } from "@/Home/constants/playerContextConstants";
import { useSearchParams } from "next/navigation";
import { useMemo, useCallback, useState } from "react";
import RandomizeIcon from "../icons/RandomizeIcon";

interface RandomizeButtonProps {
    onClick: (random: boolean) => void
}

export const RandomizeButton: React.FC<RandomizeButtonProps> = ({ onClick }) => {
    const searchParams = useSearchParams();
    const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;
    const [selected, setSelected] = useState(false);
    const [statusParam, inFocusParam, orderParam] = useMemo(() => [searchParams.get(PLAYER_STATUS), searchParams.get(IN_FOCUS), searchParams.get(ORDER)], [searchParams]);
    const handleClick = useCallback(() => {
        const newSelected = !selected;
        setSelected(newSelected)
        onClick(newSelected);
    }, [statusParam, inFocusParam, orderParam, selected, onClick]);
    const shadowStyle = useMemo(() => selected ? 'shadow-green' : 'shadow-pink', [selected]);
    return (
        <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full ${shadowStyle}`} onClick={handleClick}>
            <RandomizeIcon />
        </button>
    )
}

export default RandomizeButton;