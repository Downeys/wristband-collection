import { Label } from "@/common/components/text/Label";

interface SpanButtonProps {
    text: string;
    color?: 'black' | 'white';
    id?: string;
    onClick: (id?: string) => void;
}

export const SpanButton: React.FC<SpanButtonProps> = ({ text, color, id, onClick }) => {
    const textColor = color ?? 'white';
    return (
        <span className="p-1 cursor-pointer" onClick={() => onClick(id)}>
            <Label text={text} color={textColor} bold />
        </span>
    )
}

export default SpanButton;