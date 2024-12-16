'use client'

import { Label } from "@/common/components/text/Label";
import { MouseEventHandler, useCallback } from "react";

interface SpanButtonProps {
    text: string;
    color?: 'black' | 'white';
    id?: string;
    onClick: (id?: string) => void;
}

export const SpanButton: React.FC<SpanButtonProps> = ({ text, color, id, onClick }) => {
    const textColor = color ?? 'white';
    const handleClick: MouseEventHandler<HTMLSpanElement> = useCallback((e) => onClick(id), [id, onClick])

    return (
        <div className="p-1 cursor-pointer" onClick={handleClick}>
            <Label text={text} color={textColor} bold />
        </div>
    )
}

export default SpanButton;