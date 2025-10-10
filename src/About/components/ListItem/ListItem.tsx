import React from 'react';
import styles from './ListItem.module.scss'
import Font from '../../../common/config/fonts';

interface ListItemProps {
    message: string;
}

export const ListItem: React.FC<ListItemProps> = ({ message }) => <li className={`${styles.listItem} ${Font.secondary.className}`}>{message}</li>

export default ListItem;