import SkipIcon from "../icons/SkipIcon";

export const SkipButton: React.FC = () => {
    return (
        <span>
            <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink`} onClick={() => {}}>
                <SkipIcon />
            </button>
        </span>
    )
}

export default SkipButton;