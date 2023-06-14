import { CustomPaper } from '../custom';
import { FirstCatIcon } from '../icons/FirstCat';
import { FourthCatIcon } from '../icons/FourthCat';
import { SecondCatIcon } from '../icons/SecondCat';
import { ThirdCatIcon } from '../icons/ThirdCat';
import { Video } from '../Video/Video';
import styles from './VideoContainer.module.scss';

interface IProps {
  username: string;
  isLocalUser: boolean;
  videoTrack: MediaStreamTrack | null | undefined;
  audioTrack: MediaStreamTrack | null | undefined;
}

export const VideoContainer = ({ isLocalUser, videoTrack, username, audioTrack }: IProps) => {
  const empty = [<FirstCatIcon />, <SecondCatIcon />, <ThirdCatIcon />, <FourthCatIcon />];

  return (
    <div className={styles.container}>
      {empty.map((cat, i) => (
        <CustomPaper key={i} className={styles.video}>
          {cat}
          <Video src={videoTrack} />
        </CustomPaper>
      ))}
    </div>
  );
};
