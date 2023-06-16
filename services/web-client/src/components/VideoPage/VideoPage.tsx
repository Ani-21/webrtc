import { memo } from 'react';
import { ButtonsMenu } from '../ButtonsMenu/ButtonsMenu';
import { ParticipantsContainer } from '../ParticipantsContainer/ParticipantsContainer';

import styles from './VideoPage.module.scss';

export const VideoPage = memo(() => {
  return (
    <div className={styles.sectionContainer}>
      <ParticipantsContainer />
      <ButtonsMenu />
    </div>
  );
});
