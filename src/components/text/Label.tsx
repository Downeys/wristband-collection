import React from "react";
import { Lacquer, Life_Savers } from 'next/font/google';

const lifeSafers = Life_Savers({ subsets: ["latin"], weight: ["400", "700", "800"] });
const lacquer = Lacquer({ subsets: ["latin"], weight: "400" })

export interface LabelProps {
    text: string;
    size?: 'sm' | 'lg' | 'xl' | '2xl'
    bold?: boolean;
    semibold?: boolean;
    alignment?: 'center';
    font?: 'primary' | 'secondary';
    color?: 'white' | 'black';
    additionalStyles?: string;
    inline?: boolean;
}

export const Label: React.FC<LabelProps> = (props) => {
    const bold = props.bold ? 'font-bold ' : '';
    const semibold = props.semibold ? 'font-semibold ' : '';
    const size = props.size ? `text-${props.size} ` : '';
    const inline = props.inline ? 'inline ' : '';
    const alignment = props.alignment ? `text-${props.alignment} ` : '';
    const font = props.font === 'primary' ? `${lacquer.className} ` : `${lifeSafers.className} `;
    const color = props.color === 'black' ? 'text-black ' : 'text-white ';
    const additionalStyles = props.additionalStyles ?? '';
    const styling = bold + semibold + size + inline + alignment + font + color + additionalStyles;
    return <p className={`${styling}`}>{props.text}</p>
}

export default Label
