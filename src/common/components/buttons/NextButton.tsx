'use client'

import NextIcon from "@/common/components/icons/NextIcon";
import { SearchParams } from '../../../Home/constants/playerContextConstants';
import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface NextButtonProps {
    onClick: (status: string, inFocus: string, order: string) => void;
}

export const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
    const searchParams = useSearchParams();
    const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;
    const [statusParam, inFocusParam, orderParam] = useMemo(() => [searchParams.get(PLAYER_STATUS), searchParams.get(IN_FOCUS), searchParams.get(ORDER)], [searchParams]);
    const handleClick = useCallback(() => {
        onClick(statusParam!, inFocusParam!, orderParam!);
    }, [statusParam, inFocusParam, orderParam])
    return (
        <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink`} onClick={handleClick}>
            <NextIcon />
        </button>
    )
}

export default NextButton;