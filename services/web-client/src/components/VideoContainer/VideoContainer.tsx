import { useVideoChatContext } from '@/contexts/videoChatContext';
import { CustomPaper } from '../custom';
import { FirstCatIcon } from '../icons/FirstCat';
import { FourthCatIcon } from '../icons/FourthCat';
import { SecondCatIcon } from '../icons/SecondCat';
import { ThirdCatIcon } from '../icons/ThirdCat';
import { Video } from '../Video/Video';
import styles from './VideoContainer.module.scss';

export const VideoContainer = () => {
  const empty = [<FirstCatIcon />, <SecondCatIcon />, <ThirdCatIcon />, <FourthCatIcon />];
  const { participants } = useVideoChatContext();

  return (
    <div className={styles.container}>
      {participants?.map((participant, i) => (
        <CustomPaper key={i} className={styles.video}>
          {participant ? <Video src={participant.videoTrack} /> : empty[i]}
        </CustomPaper>
      ))}
    </div>
  );
};
