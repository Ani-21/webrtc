import { CustomPaper } from "../custom";
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
    </div>
  );
};
