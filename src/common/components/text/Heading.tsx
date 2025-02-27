import React from 'react';
import Font from '@/common/config/fonts';

export interface HeadingProps {
  text: string;
  additionalStyles?: string;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

export const Heading: React.FC<HeadingProps> = (props) => {
  const size = props.size ?? 'lg';
  const additionalStyles = props.additionalStyles ? ` ${props.additionalStyles}` : '';
  const fontSizes = {
    lg: 'text-lg ',
    xl: 'text-xl ',
    '2xl': 'text-2xl ',
    '3xl': 'text-3xl ',
    '4xl': 'text-4xl ',
    '5xl': 'text-5xl ',
  };
  return <p className={`${Font.primary.className} dark:text-white font-bold leading-5 ${fontSizes[size]} ${additionalStyles}`}>{props.text}</p>;
};

export default Heading;
