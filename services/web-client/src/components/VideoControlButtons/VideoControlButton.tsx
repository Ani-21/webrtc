import { cnb } from 'cnbuilder';
import React from 'react';
import styles from './VideoControlButton.module.scss';

interface IProps {
  children: React.ReactElement;
  tooltip: string;
  color: 'light' | 'danger';
}

export const VideoControlButton = ({ children, tooltip, color }: IProps) => {
  return (
    <div className={styles.container}>
      <button className={cnb(styles.btn, { [styles.light]: color === 'light', [styles.danger]: color === 'danger' })}>
        {children}
      </button>
      {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
    </div>
  );
};
