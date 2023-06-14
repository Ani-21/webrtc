import { memo } from 'react';
import { ButtonsMenu } from '../ButtonsMenu/ButtonsMenu';
import { VideoContainer } from '../VideoContainer/VideoContainer';
import styles from './VideoPage.module.scss';

export const VideoPage = memo(() => {
  return (
    <div className={styles.sectionContainer}>
      <VideoContainer />
      <ButtonsMenu />
    </div>
  );
});
