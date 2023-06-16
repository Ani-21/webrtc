import React from 'react';
import { cnb } from 'cnbuilder';

import styles from './VideoControlButton.module.scss';

interface IProps {
  children: React.ReactElement;
  tooltip: string;
  color: 'light' | 'danger';
  handleClick?: () => void;
}

export const VideoControlButton = ({ children, tooltip, color, handleClick }: IProps) => {
  return (
    <div className={styles.container}>
      <button
        onClick={handleClick}
        className={cnb(styles.btn, { [styles.light]: color === 'light', [styles.danger]: color === 'danger' })}
      >
        {children}
      </button>
      {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
    </div>
  );
};
