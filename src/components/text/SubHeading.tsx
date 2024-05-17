import React from 'react'

export interface SubHeadingProps {
    text: string;
    additionalStyles?: string;
}

export const SubHeading: React.FC<SubHeadingProps> = (props) => {
    return <p className={`font-semibold text-lg leading-7 dark:text-white ${props.additionalStyles}`}>{props.text}</p>
}

export default SubHeading
