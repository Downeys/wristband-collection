import React from "react";

export interface HeadingProps {
    text: string;
    additionalStyles?: string;
    size?: 'lg' | 'xl' | '2xl'
}

export const Heading: React.FC<HeadingProps> = (props) => {
    const size = props.size ?? 'lg';
    const additionalStyles = props.additionalStyles ? ` ${props.additionalStyles}` : '';
    const fontSizes = {
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl' 
    }
    return <p className={`dark:text-white font-bold leading-5 ${fontSizes[size]} ${additionalStyles}`}>{props.text}</p>
}

export default Heading