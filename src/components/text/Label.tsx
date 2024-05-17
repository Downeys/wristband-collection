import React from "react";

export interface LabelProps {
    text: string;
    size?: 'sm' | 'lg' | 'xl' | '2xl'
    bold?: boolean;
    semibold?: boolean;
    alignment?: 'center';
    additionalStyles?: string;
    inline?: boolean;
}

export const Label: React.FC<LabelProps> = (props) => {
    const bold = props.bold ? 'font-bold ' : '';
    const semibold = props.semibold ? 'font-semibold ' : '';
    const size = props.size ? `text-${props.size} ` : '';
    const inline = props.inline ? 'inline ' : '';
    const alignment = props.alignment ? `text-${props.alignment} ` : '';
    const additionalStyles = props.additionalStyles ?? '';
    const styling = bold + semibold + size + inline + alignment + additionalStyles;
    return <p className={`dark:text-white ${styling}`}>{props.text}</p>
}

export default Label
