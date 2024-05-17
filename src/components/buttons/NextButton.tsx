import NextIcon from "../icons/NextIcon";

interface NextButtonProps {
    onClick: () => void;
}

export const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
    return (
        <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink pt-2 pl-1`} onClick={onClick}>
            <NextIcon />
        </button>
    )
}

export default NextButton;