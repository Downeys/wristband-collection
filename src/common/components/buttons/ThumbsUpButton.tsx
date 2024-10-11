import ThumbsUpIcon from "@/common/components/icons/ThumbsUpIcon";


export const ThumbsUpButton: React.FC = () => {
    return (
        <span>
            <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink`} onClick={() => {}}>
                <ThumbsUpIcon />
            </button>
        </span>
    )
}

export default ThumbsUpButton;