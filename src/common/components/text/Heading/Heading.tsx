import React from 'react';
import Font from '../../../../common/config/fonts';
import styles from './Heading.module.scss';

export interface HeadingProps {
  text: string;
  additionalStyles?: string;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

export const Heading: React.FC<HeadingProps> = (props) => {
  const size = props.size ?? 'lg';
  const additionalStyles = props.additionalStyles ? ` ${props.additionalStyles}` : '';
  const fontSizes = {
    lg: styles.largeText,
    xl: styles.xlText,
    '2xl': styles.xxlText,
    '3xl': styles.xxxlText,
    '4xl': styles.xxxxlText,
    '5xl': styles.xxxxxlText,
  };
  return <p className={`${additionalStyles} ${Font.primary.className} ${styles.heading} ${fontSizes[size]}`}>{props.text}</p>;
};

export default Heading;
