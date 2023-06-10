import { CustomPaper } from '../custom';
import { FirstCatIcon } from '../icons/FirstCat';
import { FourthCatIcon } from '../icons/FourthCat';
import { SecondCatIcon } from '../icons/SecondCat';
import { ThirdCatIcon } from '../icons/ThirdCat';
import styles from './VideoContainer.module.scss';

export const VideoContainer = () => {
  const empty = [<FirstCatIcon />, <SecondCatIcon />, <ThirdCatIcon />, <FourthCatIcon />];

  return (
    <div className={styles.container}>
      {empty.map((cat, i) => (
        <CustomPaper key={i} className={styles.video}>
          {cat}
        </CustomPaper>
      ))}
    </div>
  );
};
