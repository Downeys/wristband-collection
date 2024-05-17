import BackIcon from "../icons/BackIcon";

interface BackButtonProps {
    onClick: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    return (
        <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink pt-2 pr-1`} onClick={onClick}>
            <BackIcon />
        </button>
    )
}

export default BackButton;