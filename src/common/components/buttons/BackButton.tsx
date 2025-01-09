'use client'

import BackIcon from "@/common/components/icons/BackIcon";
import { SearchParams } from "@/Home/constants/playerContextConstants";
import { useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";

interface BackButtonProps {
    onClick: (status: string, inFocus: string, order: string) => void
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    const searchParams = useSearchParams();
    const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;
    const [statusParam, inFocusParam, orderParam] = useMemo(() => [searchParams.get(PLAYER_STATUS), searchParams.get(IN_FOCUS), searchParams.get(ORDER)], [searchParams]);
    const handleClick = useCallback(() => {
        onClick(statusParam!, inFocusParam!, orderParam!);
    }, [statusParam, inFocusParam, orderParam, onClick])
    return (
        <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink mt-4`} onClick={handleClick}>
            <BackIcon />
        </button>
    )
}

export default BackButton;