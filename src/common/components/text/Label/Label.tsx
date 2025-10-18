import React from 'react';
import Font from '../../../../common/config/fonts';
import styles from './Label.module.scss';

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
  white: styles.whiteText,
  black: styles.blackText,
  red: styles.redText,
};

const textSizeConfig = {
  sm: styles.smallText,
  lg: styles.largeText,
  xl: styles.xlText,
  '2xl': styles.xxlText
}

const textAlignmentConfig = {
  center: styles.centeredText
}

export const Label: React.FC<LabelProps> = (props) => {
  const getStyles = (props: LabelProps): string => {
    let classes = [];
    if (props.bold) classes.push(styles.boldText)
    else if (props.semibold) classes.push(styles.semiboldText);
    if (props.alignment) classes.push(textAlignmentConfig[props.alignment]);
    if (props.inline) classes.push(styles.inlineText);
    classes.push(props.size ? textSizeConfig[props.size] : styles.mediumText);
    classes.push(props.font === 'primary' ? Font.primary.className : Font.secondary.className);
    classes.push(props.color ? textColorConfig[props.color] : styles.whiteText);
    if (props.additionalStyles) classes.push(props.additionalStyles);
    return classes.join(' ').trimEnd();
  }
  const styling = getStyles(props);
  return <p className={`${styling}`}>{props.text}</p>;
};

export default Label;
