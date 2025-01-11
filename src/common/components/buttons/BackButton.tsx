'use client'

import BackIcon from "@/common/components/icons/BackIcon";

interface BackButtonProps {
    onClick: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
    <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink mt-4`} onClick={onClick}>
        <BackIcon />
    </button>
)   

export default BackButton;