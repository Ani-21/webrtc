import { CustomPaper } from "../custom";
import { CameraIcon } from "../icons/Camera";
import { EndCallIcon } from "../icons/EndCall";
import { MicroIcon } from "../icons/Micro";
import { ThirdCatIcon } from "../icons/ThirdCat";
import styles from "./VideoContainer.module.scss";

export const VideoContainer = () => {
  const empty = Array(4).fill("");

  return (
    <div className={styles.container}>
      {empty.map((_, i) => (
        <CustomPaper key={i} className={styles.video}>
          <ThirdCatIcon />
        </CustomPaper>
      ))}
      <div className={styles.buttonsContainer}>
        <MicroIcon />
        <CameraIcon />
        <EndCallIcon />
      </div>
    </div>
  );
};
