import React from 'react';
import Font from '@/common/config/fonts';

export interface LabelProps {
  text: string;
  size?: 'sm' | 'lg' | 'xl' | '2xl';
  bold?: boolean;
  semibold?: boolean;
  alignment?: 'center';
  font?: 'primary' | 'secondary';
  color?: 'white' | 'black' | 'red';
  additionalStyles?: string;
  inline?: boolean;
}

const textColorConfig = {
  white: 'text-white',
  black: 'text-black',
  red: 'text-red-600',
};

export const Label: React.FC<LabelProps> = (props) => {
  const bold = props.bold ? 'font-bold ' : '';
  const semibold = props.semibold ? 'font-semibold ' : '';
  const size = props.size ? `text-${props.size} ` : '';
  const inline = props.inline ? 'inline ' : '';
  const alignment = props.alignment ? `text-${props.alignment} ` : '';
  const font = props.font === 'primary' ? `${Font.primary.className} ` : `${Font.secondary.className} `;
  const color: string = props.color ? textColorConfig[props.color] : 'text-white ';
  const additionalStyles = props.additionalStyles ?? '';
  const styling = bold + semibold + size + inline + alignment + font + color + additionalStyles;
  return <p className={`${styling}`}>{props.text}</p>;
};

export default Label;
