import ThumbsDownIcon from "../icons/ThumbsDownIcon";


export const ThumbsDownButton: React.FC = () => {
    return (
        <span>
            <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink`} onClick={() => {}}>
                <ThumbsDownIcon />
            </button>
        </span>
    )
}

export default ThumbsDownButton;